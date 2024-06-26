package com.esentai.table

import java.sql.DriverManager
import java.sql.SQLException
import java.sql.Connection
import com.esentai.client.entity.DictionaryLink
import com.esentai.client.response.CreateLinkResponse
import com.esentai.client.response.GetLinksResponse
import com.esentai.entity.Language

class SqliteSession private constructor() {

    companion object {

        @Volatile private var instance: SqliteSession? = null

        fun getInstance() = instance ?: synchronized(this) {
            instance ?: SqliteSession().also { instance = it }
        }
    }

    private fun getConnectionString(): String {
        return "jdbc:sqlite:dictionary.db"
    }

    init {
        try {
            DriverManager.getConnection(getConnectionString()).use { connection ->
                connection.createStatement().use { statement ->

                    val createGlossTableQuery = """
                        CREATE TABLE IF NOT EXISTS Gloss (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            lang TEXT NOT NULL,
                            partOfSpeech TEXT NOT NULL,
                            text TEXT NOT NULL,
                            comment TEXT,
                            created DATETIME DEFAULT CURRENT_TIMESTAMP,
                            modified DATETIME DEFAULT CURRENT_TIMESTAMP
                        );
                    """.trimIndent()
                    statement.execute(createGlossTableQuery)

                    val createLinkTableQuery = """
                        CREATE TABLE IF NOT EXISTS Link (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            firstLang TEXT NOT NULL,
                            secondLang TEXT NOT NULL,
                            firstId INTEGER NOT NULL,
                            secondId INTEGER NOT NULL,
                            created DATETIME DEFAULT CURRENT_TIMESTAMP,
                            modified DATETIME DEFAULT CURRENT_TIMESTAMP
                        );
                    """.trimIndent()
                    statement.execute(createLinkTableQuery)

                }
            }
        } catch (e: SQLException) {
            println(e.message)
        }
    }

    private fun getConnection(): Connection {
        return DriverManager.getConnection(getConnectionString())
    }

    fun createLink(firstLang: Language, secondLang: Language, firstText: String, secondText: String): CreateLinkResponse {
        var firstId: Long? = null
        var secondId: Long? = null

        try {
            getConnection().use { connection ->
                connection.autoCommit = false

                try {
                    connection.prepareStatement(
                        "INSERT INTO Gloss (lang, partOfSpeech, text) VALUES (?, ?, ?)",
                        java.sql.Statement.RETURN_GENERATED_KEYS
                    ).use { statement ->
                        statement.setString(1, firstLang.code)
                        statement.setString(2, "noun")
                        statement.setString(3, firstText)
                        statement.executeUpdate()
                        val generatedKeys = statement.generatedKeys
                        if (generatedKeys.next()) {
                            firstId = generatedKeys.getLong(1)
                        }
                    }

                    connection.prepareStatement(
                        "INSERT INTO Gloss (lang, partOfSpeech, text) VALUES (?, ?, ?)",
                        java.sql.Statement.RETURN_GENERATED_KEYS
                    ).use { statement ->
                        statement.setString(1, secondLang.code)
                        statement.setString(2, "noun")
                        statement.setString(3, secondText)
                        statement.executeUpdate()
                        val generatedKeys = statement.generatedKeys
                        if (generatedKeys.next()) {
                            secondId = generatedKeys.getLong(1)
                        }
                    }

                    if (firstId != null && secondId != null) {
                        connection.prepareStatement(
                            "INSERT INTO Link (firstLang, secondLang, firstId, secondId) VALUES (?, ?, ?, ?)"
                        ).use { statement ->
                            statement.setString(1, firstLang.code)
                            statement.setString(2, secondLang.code)
                            statement.setLong(3, firstId!!)
                            statement.setLong(4, secondId!!)
                            statement.executeUpdate()
                        }
                    }

                    connection.commit()
                    return CreateLinkResponse(firstId ?: 0, firstLang.code, secondLang.code, firstText, secondText)
                } catch (e: SQLException) {
                    connection.rollback()
                    println(e.message)
                } finally {
                    connection.autoCommit = true
                }
            }
        } catch (e: SQLException) {
            println(e.message)
        }

        return CreateLinkResponse(0, firstLang.code, secondLang.code, firstText, secondText)
    }

    fun getLinks(query: String, srcLang: Language, dstLang: Language, limit: Int): GetLinksResponse {
        val links = mutableListOf<DictionaryLink>()

        try {
            getConnection().use { connection ->
                connection.prepareStatement(
                    """
                    SELECT l.id, g1.lang AS firstLang, g1.text AS firstText, g2.lang AS secondLang, g2.text AS secondText 
                    FROM Link l
                    JOIN Gloss g1 ON l.firstId = g1.id
                    JOIN Gloss g2 ON l.secondId = g2.id
                    WHERE g1.text LIKE ? AND l.firstLang = ? AND l.secondLang = ?
                    LIMIT ?
                    """.trimIndent()
                ).use { statement ->
                    statement.setString(1, "%$query%")
                    statement.setString(2, srcLang.code)
                    statement.setString(3, dstLang.code)
                    statement.setInt(4, limit)

                    val resultSet = statement.executeQuery()
                    while (resultSet.next()) {
                        val link = DictionaryLink(
                            id = resultSet.getLong("id"),
                            srcLang = resultSet.getString("firstLang"),
                            dstLang = resultSet.getString("secondLang"),
                            srcGloss = resultSet.getString("firstText"),
                            dstGloss = resultSet.getString("secondText")
                        )
                        links.add(link)
                    }
                }
            }
        } catch (e: SQLException) {
            println(e.message)
        }

        return GetLinksResponse(links)
    }
}

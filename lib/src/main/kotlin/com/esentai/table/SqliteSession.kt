package com.esentai.table

import java.sql.DriverManager
import java.sql.SQLException
import java.sql.Connection
import com.esentai.client.entity.DictionaryLink
import com.esentai.client.entity.Gloss
import com.esentai.client.response.CreateGlossResponse
import com.esentai.client.response.CreateLinkResponse
import com.esentai.client.response.GetGlossesResponse
import com.esentai.client.response.GetLinksResponse
import com.esentai.entity.Language
import io.ktor.util.logging.*

val LOG = KtorSimpleLogger("com.esentai.table.SqliteSession")

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

    private fun getConnection(): Connection {
        return DriverManager.getConnection(getConnectionString())
    }

    init {
        try {
            getConnection().use { connection ->
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

    fun createGloss(language: Language, partOfSpeech: String, text: String, comment: String): CreateGlossResponse {
        var id: Long? = null
        try {
            getConnection().use { connection ->
                connection.autoCommit = false

                try {
                    connection.prepareStatement(
                        "INSERT INTO Gloss (lang, partOfSpeech, text, comment) VALUES (?, ?, ?, ?)",
                        java.sql.Statement.RETURN_GENERATED_KEYS
                    ).use { statement ->
                        statement.setString(1, language.code)
                        statement.setString(2, partOfSpeech)
                        statement.setString(3, text)
                        statement.setString(4, comment)
                        statement.executeUpdate()
                        val generatedKeys = statement.generatedKeys
                        if (generatedKeys.next()) {
                            id = generatedKeys.getLong(1)
                        }
                    }

                    connection.commit()

                    return CreateGlossResponse(id ?: 0, language.code, partOfSpeech, text, comment)
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

        return CreateGlossResponse(id, language.code, partOfSpeech, text, comment)
    }

    fun getGlosses(query: String, lang: Language, partOfSpeech: String, limit: Int): GetGlossesResponse {
        val glosses = mutableListOf<Gloss>()

        try {
            getConnection().use { connection ->
                connection.prepareStatement(
                    """
                    SELECT id, lang, partOfSpeech, text, comment 
                    FROM Gloss
                    WHERE text LIKE ? AND lang = ? AND partOfSpeech = ?
                    LIMIT ?
                    """.trimIndent()
                ).use { statement ->
                    statement.setString(1, "%$query%")
                    statement.setString(2, lang.code)
                    statement.setString(3, partOfSpeech)
                    statement.setInt(4, limit)

                    val resultSet = statement.executeQuery()
                    while (resultSet.next()) {
                        val gloss = Gloss(
                            id = resultSet.getLong("id"),
                            lang = resultSet.getString("lang"),
                            partOfSpeech = resultSet.getString("partOfSpeech"),
                            text = resultSet.getString("text"),
                            comment = resultSet.getString("comment")
                        )
                        glosses.add(gloss)
                    }
                }
            }
        } catch (e: SQLException) {
            println(e.message)
        }

        return GetGlossesResponse(glosses)
    }

    fun getGlosses(query: String, lang: Language, limit: Int): GetGlossesResponse {
        val glosses = mutableListOf<Gloss>()

        try {
            getConnection().use { connection ->
                connection.prepareStatement(
                    """
                    SELECT id, lang, partOfSpeech, text, comment 
                    FROM Gloss
                    WHERE text LIKE ? AND lang = ?
                    LIMIT ?
                    """.trimIndent()
                ).use { statement ->
                    statement.setString(1, "%$query%")
                    statement.setString(2, lang.code)
                    statement.setInt(4, limit)

                    val resultSet = statement.executeQuery()
                    while (resultSet.next()) {
                        val gloss = Gloss(
                            id = resultSet.getLong("id"),
                            lang = resultSet.getString("lang"),
                            partOfSpeech = resultSet.getString("partOfSpeech"),
                            text = resultSet.getString("text"),
                            comment = resultSet.getString("comment")
                        )
                        glosses.add(gloss)
                    }
                }
            }
        } catch (e: SQLException) {
            println(e.message)
        }

        return GetGlossesResponse(glosses)
    }

    fun createLink(srcGlossId: Long, dstGlossId: Long): CreateLinkResponse {
        var id: Long? = null
        try {
            getConnection().use { connection ->
                connection.autoCommit = false

                try {
                    connection.prepareStatement(
                        "INSERT INTO Link (firstId, secondId) VALUES (?, ?)"
                    ).use { statement ->
                        statement.setLong(1, srcGlossId)
                        statement.setLong(2, dstGlossId)
                        statement.executeUpdate()

                        val generatedKeys = statement.generatedKeys
                        if (generatedKeys.next()) {
                            id = generatedKeys.getLong(1)
                        }
                    }
                    connection.commit()
                    return CreateLinkResponse(id, srcGlossId, dstGlossId)
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

        return CreateLinkResponse(id, srcGlossId, dstGlossId)
    }
    
    fun getLinks(query: String, srcLang: Language, dstLang: Language, limit: Int, reversed: Boolean): GetLinksResponse {
        val links = mutableListOf<DictionaryLink>()

        try {
            getConnection().use { connection ->
                val (firstGloss, secondGloss) = if (reversed) "g2" to "g1" else "g1" to "g2"
                val matchingGloss = if (reversed) "g2" else "g1"

                val sql = """
                    SELECT 
                        l.id,
                        $firstGloss.lang AS lang1, 
                        $firstGloss.text AS text1,
                        $firstGloss.comment AS comment1,
                        $firstGloss.partOfSpeech AS pos1,
                        $secondGloss.lang AS lang2, 
                        $secondGloss.text AS text2,
                        $secondGloss.comment AS comment2,
                        $secondGloss.partOfSpeech AS pos2
                    FROM Link l
                    JOIN Gloss g1 ON l.firstId = g1.id
                    JOIN Gloss g2 ON l.secondId = g2.id
                    WHERE $matchingGloss.text LIKE ? AND $firstGloss.lang = ? AND $secondGloss.lang = ?
                    LIMIT ?
                """.trimIndent()

                connection.prepareStatement(sql).use { statement ->
                    statement.setString(1, "%$query%")
                    statement.setString(2, srcLang.code)
                    statement.setString(3, dstLang.code)
                    statement.setInt(4, limit)

                    LOG.info("Executing query: $statement")

                    val resultSet = statement.executeQuery()
                    while (resultSet.next()) {
                        val link = DictionaryLink(
                            id = resultSet.getLong("id"),
                            srcLang = resultSet.getString("lang1"),
                            srcGloss = resultSet.getString("text1"),
                            srcComment = resultSet.getString("comment1"),
                            srcPartOfSpeech = resultSet.getString("pos1"),
                            dstLang = resultSet.getString("lang2"),
                            dstGloss = resultSet.getString("text2"),
                            dstComment = resultSet.getString("comment2"),
                            dstPartOfSpeech = resultSet.getString("pos2")
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

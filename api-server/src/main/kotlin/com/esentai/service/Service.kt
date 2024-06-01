package com.esentai

import com.esentai.client.response.CreateLinkResponse
import com.esentai.client.response.GetLinksResponse
import com.esentai.entity.Language
import com.esentai.table.SqliteSession

class Service {

    fun createLink(srcLang: Language, dstLang: Language, srcGloss: String, dstGloss: String): CreateLinkResponse {
        return SqliteSession.getInstance().createLink(srcLang, dstLang, srcGloss, dstGloss)
//        return CreateLinkResponse(1, srcLang.code, dstLang.code, srcGloss, dstGloss);
    }

    fun getLinks(
        query: String,
        srcLang: Language,
        dstLang: Language,
        limit: Int
    ): GetLinksResponse {
        if (limit < 0) {
            throw IllegalArgumentException("limit must be non-negative")
        }

        val sqliteSession = SqliteSession
        if (sqliteSession == null) {
            throw IllegalStateException("sqlite session is null")
        }

        return SqliteSession.getInstance().getLinks(query, srcLang, dstLang, limit)
//        return GetLinksResponse(listOf(DictionaryLink(1,  srcLang.code, dstLang.code, query, "dstGloss")))
    }
}
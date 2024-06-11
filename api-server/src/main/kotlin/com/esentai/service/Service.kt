package com.esentai

import com.esentai.client.response.CreateGlossResponse
import com.esentai.client.response.CreateLinkResponse
import com.esentai.client.response.GetGlossesResponse
import com.esentai.client.response.GetLinksResponse
import com.esentai.entity.Language
import com.esentai.table.SqliteSession

class Service {

    fun createLink(srcLang: Language, dstLang: Language, srcGloss: String, dstGloss: String): CreateLinkResponse {
        return SqliteSession.getInstance().createLink(srcLang, dstLang, srcGloss, dstGloss)
    }

    fun getGlosses(
        query: String,
        lang: Language,
        partOfSpeech: String,
        limit: Int
    ): GetGlossesResponse {

        if (limit < 0) {
            throw IllegalArgumentException("limit must be non-negative")
        }

        return SqliteSession.getInstance().getGlosses(query, lang, partOfSpeech, limit)
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

        return SqliteSession.getInstance().getLinks(query, srcLang, dstLang, limit)
    }

    fun createGloss(language: Language, partOfSpeech: String, text: String, comment: String): CreateGlossResponse {
        return SqliteSession.getInstance().createGloss(language, partOfSpeech, text, comment)
    }
}
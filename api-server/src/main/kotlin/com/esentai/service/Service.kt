package com.esentai

import com.esentai.client.response.CreateGlossResponse
import com.esentai.client.response.CreateLinkResponse
import com.esentai.client.response.GetGlossesResponse
import com.esentai.client.response.GetLinksResponse
import com.esentai.entity.Language
import com.esentai.table.SqliteSession
import io.ktor.util.logging.*

val LOG = KtorSimpleLogger("com.esentai.service.Service")

class Service {

    fun createLink(srcLang: Language, dstLang: Language, srcGlossId: Long, dstGlossId: Long): CreateLinkResponse {
        if (srcLang.ordinal > dstLang.ordinal) {
            LOG.info("Creating link from ${srcLang.code} to ${dstLang.code}")
            return SqliteSession.getInstance().createLink(dstGlossId, srcGlossId)
        }
        LOG.info("Creating link from ${srcLang.code} to ${dstLang.code}")
        return SqliteSession.getInstance().createLink(srcGlossId, dstGlossId)
    }

    fun getGlosses(
        query: String,
        lang: Language,
        partOfSpeech: String?,
        limit: Int
    ): GetGlossesResponse {
        if (limit < 0) {
            throw IllegalArgumentException("limit must be non-negative")
        }
        if (partOfSpeech == null) {
            return SqliteSession.getInstance().getGlosses(query, lang, limit)
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
        LOG.info("src.ordinal: ${srcLang.ordinal}, dst.ordinal: ${dstLang.ordinal}")
        return SqliteSession.getInstance().getLinks(query, srcLang, dstLang, limit, srcLang.ordinal > dstLang.ordinal)
    }

    fun createGloss(language: Language, partOfSpeech: String, text: String, comment: String): CreateGlossResponse {
        return SqliteSession.getInstance().createGloss(language, partOfSpeech, text, comment)
    }
}
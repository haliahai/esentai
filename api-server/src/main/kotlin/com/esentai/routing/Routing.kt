package com.esentai.routing

import com.esentai.Service
import com.esentai.client.response.*
import com.esentai.entity.Language
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.util.logging.*

val LOG = KtorSimpleLogger("com.esentai.routing.Routing")

val service = Service()

fun Application.configureRouting() {
    routing {
        get("/api/v1/get/glosses") {
            LOG.info("Got /get/glosses request")

            val query = call.parameters["q"]
            val lang = call.parameters["lang"]
            val partOfSpeech = call.parameters["pos"]
            val limit = call.parameters["limit"]?.toIntOrNull() ?: 10

            if (query == null || lang == null || partOfSpeech == null) {
                call.respond(GenericResponse.createError("invalid request"))
                return@get
            }

            if (query.length !in 1..128) {
                call.respond(GenericResponse.createError("invalid query"))
                return@get
            }

            val language = Language.fromCode(lang)

            if (language == null) {
                call.respond(GenericResponse.createError("invalid language"))
                return@get
            }

            val response : GetGlossesResponse = service.getGlosses(query, language, partOfSpeech, limit)
            call.respond(response)
        }

        post("/api/v1/create/gloss") {
            LOG.info("Got /create/gloss request")

            val lang = call.parameters["lang"]
            val partOfSpeech = call.parameters["pos"]
            val text = call.parameters["text"]
            val comment = call.parameters["comment"]

            if (text == null || comment == null || lang == null || partOfSpeech == null) {
                call.respond(GenericResponse.createError("invalid request"))
                return@post
            }

            val language = Language.fromCode(lang)

            if (language == null) {
                call.respond(GenericResponse.createError("invalid language"))
                return@post
            }

            val response : CreateGlossResponse = service.createGloss(language, partOfSpeech, text, comment)
            call.respond(response)
        }

        get("/api/v1/get/links") {
            LOG.info("Got /get/links request")

            val query = call.parameters["q"]
            val src = call.parameters["src"]
            val dst = call.parameters["dst"]
            val limit = call.parameters["limit"]?.toIntOrNull() ?: 10

            if (query == null || src == null || dst == null) {
                call.respond(GenericResponse.createError("invalid request"))
                return@get
            }

            if (query.length !in 1..128) {
                call.respond(GenericResponse.createError("invalid query"))
                return@get
            }

            val srcLang = Language.fromCode(src)
            val dstLang = Language.fromCode(dst)

            if (srcLang == null || dstLang == null) {
                call.respond(GenericResponse.createError("invalid language"))
                return@get
            }

            val response : GetLinksResponse = service.getLinks(query, srcLang, dstLang, limit)
            call.respond(response)
        }

        post("/api/v1/create/link") {
            LOG.info("Got /create/link request")
            val src = call.parameters["src"]
            val dst = call.parameters["dst"]
            val srcGloss = call.parameters["srcGloss"]
            val dstGloss = call.parameters["dstGloss"]

            if (src == null || dst == null || srcGloss == null || dstGloss == null) {
                call.respond(GenericResponse.createError("invalid request"))
                return@post
            }

            val srcLang = Language.fromCode(src)
            val dstLang = Language.fromCode(dst)

            if (srcLang == null || dstLang == null) {
                call.respond(GenericResponse.createError("invalid language"))
                return@post
            }

            val response : CreateLinkResponse = service.createLink(srcLang, dstLang, srcGloss, dstGloss)
            call.respond(response)
        }
    }
}
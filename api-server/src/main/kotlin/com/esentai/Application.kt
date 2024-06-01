package com.esentai

import com.esentai.routing.configureRouting
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.plugins.contentnegotiation.*

fun main() {
    embeddedServer(Netty, port = getPort(), host = getHost(), module = Application::module)
        .start(wait = true)
}

fun getHost(): String {
    val variable = System.getenv("NETTY_HOST")
    if (variable.isNullOrEmpty()) {
        return "0.0.0.0"
    }
    return variable
}

fun getPort(): Int {
    val variable = System.getenv("NETTY_PORT")
    if (variable.isNullOrEmpty()) {
        return 8080
    }
    return variable.toInt()
}

fun Application.module() {
    configureRouting()
    install(ContentNegotiation) {
        json()
    }
}
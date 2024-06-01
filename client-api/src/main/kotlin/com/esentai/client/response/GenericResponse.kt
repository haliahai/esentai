package com.esentai.client.response

import kotlinx.serialization.Serializable

@Serializable
data class GenericResponse(
    val success: Boolean,
    val message: String
) {
    companion object {
        fun createError(message: String) = GenericResponse(false, message)

        fun createSuccess() = GenericResponse(true, "")
    }
}
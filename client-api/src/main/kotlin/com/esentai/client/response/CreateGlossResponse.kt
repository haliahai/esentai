package com.esentai.client.response

import kotlinx.serialization.Serializable

@Serializable
data class CreateGlossResponse(
    val id: Long?,
    val lang: String,
    val partOfSpeech: String,
    val text: String,
    val comment: String
)

package com.esentai.client.entity

import kotlinx.serialization.Serializable

@Serializable
data class Gloss(
    val id: Long,
    val lang: String,
    val partOfSpeech: String,
    val text: String,
    val comment: String
)

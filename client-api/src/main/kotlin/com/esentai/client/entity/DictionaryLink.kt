package com.esentai.client.entity

import kotlinx.serialization.Serializable

@Serializable
data class DictionaryLink(
    val id: Long,
    val srcLang: String,
    val srcGloss: String,
    val srcComment: String,
    val srcPartOfSpeech: String,
    val dstLang: String,
    val dstGloss: String,
    val dstComment: String,
    val dstPartOfSpeech: String
)

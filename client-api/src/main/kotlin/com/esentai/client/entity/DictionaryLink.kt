package com.esentai.client.entity

import kotlinx.serialization.Serializable

@Serializable
data class DictionaryLink(
    val id: Long,
    val srcLang: String,
    val dstLang: String,
    val srcGloss: String,
    val dstGloss: String
)

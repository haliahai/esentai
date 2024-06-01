package com.esentai.client.response

import kotlinx.serialization.Serializable

@Serializable
data class CreateLinkResponse(
    val id: Long,
    val srcLang: String,
    val dstLang: String,
    val srcGloss: String,
    val dstGloss: String
)

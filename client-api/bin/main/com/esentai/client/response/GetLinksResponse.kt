package com.esentai.client.response

import com.esentai.client.entity.DictionaryLink
import kotlinx.serialization.Serializable

@Serializable
data class GetLinksResponse(
    val links: List<DictionaryLink>
)


package com.esentai.client.response

import com.esentai.client.entity.Gloss
import kotlinx.serialization.Serializable

@Serializable
data class GetGlossesResponse(
    val glosses: List<Gloss>
)

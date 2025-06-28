package net.ojm.backend.domain.dto.response.guides

import java.time.LocalDateTime
import java.util.UUID

data class AllGuidesResponse(

    val id: UUID,
    val title: String,
    val summary: String,
    val description: String,
    val createdAt: LocalDateTime,
    val updatedAt: LocalDateTime

)

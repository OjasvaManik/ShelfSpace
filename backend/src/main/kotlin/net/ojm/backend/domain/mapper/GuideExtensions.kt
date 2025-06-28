package net.ojm.backend.domain.mapper

import net.ojm.backend.domain.dto.request.guides.GuideRequest
import net.ojm.backend.domain.dto.response.guides.AllGuidesResponse
import net.ojm.backend.domain.dto.response.guides.GuideResponse
import net.ojm.backend.domain.entity.guides.GuideEntity

fun GuideEntity.toGuideResponse(): GuideResponse {
    return GuideResponse(
        id = this.id,
        title = this.title,
        summary = this.summary,
        description = this.description,
        createdAt = this.createdAt,
        updatedAt = this.updatedAt
    )
}

fun GuideRequest.toGuideEntity(): GuideEntity {
    return GuideEntity(
        title = this.title,
        summary = this.summary,
        description = this.description
    )
}

fun GuideEntity.toAllGuidesResponse(): AllGuidesResponse {
    return AllGuidesResponse(
        id = this.id,
        title = this.title,
        summary = this.summary,
        description = this.description,
        createdAt = this.createdAt,
        updatedAt = this.updatedAt
    )
}
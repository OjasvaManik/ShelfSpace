package net.ojm.backend.domain.service.interfaces.guides

import net.ojm.backend.domain.dto.request.guides.GuideRequest
import net.ojm.backend.domain.dto.response.guides.AllGuidesResponse
import net.ojm.backend.domain.dto.response.guides.GuideResponse
import org.springframework.http.ResponseEntity
import java.util.UUID

interface GuideService {

    fun createGuide(request: GuideRequest): GuideResponse

    fun getAllGuides(): List<AllGuidesResponse>

    fun getGuideById(id: UUID): GuideResponse

    fun updateGuide(id: UUID, request: GuideRequest): GuideResponse

    fun deleteGuide(id: UUID): String

}
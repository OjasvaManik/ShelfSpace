package net.ojm.backend.domain.service.impls.guides

import net.ojm.backend.domain.dto.request.guides.GuideRequest
import net.ojm.backend.domain.dto.response.guides.AllGuidesResponse
import net.ojm.backend.domain.dto.response.guides.GuideResponse
import net.ojm.backend.domain.exception.BadRequestException
import net.ojm.backend.domain.mapper.toAllGuidesResponse
import net.ojm.backend.domain.mapper.toGuideEntity
import net.ojm.backend.domain.mapper.toGuideResponse
import net.ojm.backend.domain.repo.guides.GuideRepo
import net.ojm.backend.domain.service.interfaces.guides.GuideService
import org.springframework.data.domain.Sort
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import java.time.LocalDateTime
import java.util.UUID

@Service
class GuideServiceImpl (
    private val repo: GuideRepo
) : GuideService {

    override fun createGuide(request: GuideRequest): GuideResponse {
        val guideEntity = request.toGuideEntity()
        val savedEntity = repo.save(guideEntity)
        return savedEntity.toGuideResponse()
    }

    override fun getAllGuides(sortBy: String?, order: String?): List<AllGuidesResponse> {
        val sortField = when (sortBy) {  // Remove .lowercase()
            "title" -> "title"
            "createdAt" -> "createdAt"
            "updatedAt" -> "updatedAt"
            else -> "createdAt"
        }

        val direction = if (order?.equals("desc", true) == true) Sort.Direction.DESC else Sort.Direction.ASC
        val sort = Sort.by(direction, sortField)

        val guides = repo.findAll(sort)

        if (guides.isEmpty()) {
            throw BadRequestException("No guides found")
        }

        return guides.map { it.toAllGuidesResponse() }
    }

    override fun getGuideById(id: UUID): GuideResponse {
        val guide = repo.findById(id).orElseThrow {
            BadRequestException("Guide with ID $id not found")
        }
        return guide.toGuideResponse()
    }

    override fun updateGuide(
        id: UUID,
        request: GuideRequest
    ): GuideResponse {
        val existingGuide = repo.findById(id).orElseThrow {
            BadRequestException("Guide with ID $id not found")
        }

        // Update the existing entity directly instead of creating a copy
        existingGuide.title = request.title
        existingGuide.summary = request.summary
        existingGuide.description = request.description
        // updatedAt will be automatically set by @LastModifiedDate

        val savedGuide = repo.save(existingGuide)
        return savedGuide.toGuideResponse()
    }

    override fun deleteGuide(id: UUID): String {
        if (!repo.existsById(id)) {
            throw BadRequestException("Guide with ID $id not found")
        }
        repo.deleteById(id)
        return "Guide with ID $id deleted successfully"
    }

}
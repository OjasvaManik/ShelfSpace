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
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
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

    override fun getAllGuides(): List<AllGuidesResponse> {
        val guides = repo.findAll()

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

        val updatedGuide = existingGuide.copy(
            title = request.title,
            summary = request.summary,
            description = request.description
        )

        val savedGuide = repo.save(updatedGuide)
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
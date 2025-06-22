package net.ojm.backend.controller.guides

import net.ojm.backend.domain.dto.request.guides.GuideRequest
import net.ojm.backend.domain.dto.response.guides.AllGuidesResponse
import net.ojm.backend.domain.dto.response.guides.GuideResponse
import net.ojm.backend.domain.dto.response.success.SuccessResponse
import net.ojm.backend.domain.service.interfaces.guides.GuideService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.UUID

@RestController
@RequestMapping("/api/v1/guides")
class GuideController (
    private val guideService: GuideService
) {

    @PostMapping("/create")
    fun createGuide(@RequestBody request: GuideRequest): ResponseEntity<SuccessResponse<GuideResponse>> {
        val data = guideService.createGuide(request)
        val response = SuccessResponse(
            status = 201,
            message = "Guide created successfully",
            data = data
        )
        return ResponseEntity.ok().body(response)
    }

    @GetMapping
    fun getAllGuides(): ResponseEntity<SuccessResponse<List<AllGuidesResponse>>> {
        val data = guideService.getAllGuides()
        val response = SuccessResponse(
            status = 200,
            message = "Guides fetched successfully",
            data = data
        )
        return ResponseEntity.ok().body(response)
    }

    @GetMapping("/{id}")
    fun getGuideById(@PathVariable id: UUID): ResponseEntity<SuccessResponse<GuideResponse>> {
        val data = guideService.getGuideById(id)
        val response = SuccessResponse(
            status = 200,
            message = "Guide fetched successfully",
            data = data
        )
        return ResponseEntity.ok().body(response)
    }

    @PutMapping("/update/{id}")
    fun updateGuide(
        @PathVariable id: UUID,
        @RequestBody request: GuideRequest
    ): ResponseEntity<SuccessResponse<GuideResponse>> {
        val data = guideService.updateGuide(id, request)
        val response = SuccessResponse(
            status = 200,
            message = "Guide updated successfully",
            data = data
        )
        return ResponseEntity.ok().body(response)
    }

    @DeleteMapping("/delete/{id}")
    fun deleteGuide(@PathVariable id: UUID): ResponseEntity<SuccessResponse<String>> {
        val data = guideService.deleteGuide(id)
        val response = SuccessResponse(
            status = 200,
            message = "Guide deleted successfully",
            data = data
        )
        return ResponseEntity.ok().body(response)
    }

}
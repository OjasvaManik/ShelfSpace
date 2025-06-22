package net.ojm.backend.controller.users

import net.ojm.backend.domain.dto.response.success.SuccessResponse
import net.ojm.backend.domain.service.interfaces.users.UserService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile

@RestController
@RequestMapping(value = ["/api/v1/users"])
class UserController (
    private val userService: UserService
) {

    @PostMapping("/upload-profile-image")
    fun uploadProfileImage(
        @RequestParam("userId") userId: Long,
        @RequestParam("file") file: MultipartFile
    ): ResponseEntity<SuccessResponse<String>> {
        val imagePath = userService.uploadProfileImage(userId, file)

        val response = SuccessResponse(
            status = 200,
            message = "Profile image uploaded successfully",
            data = imagePath
        )
        return ResponseEntity.ok(response)
    }
}
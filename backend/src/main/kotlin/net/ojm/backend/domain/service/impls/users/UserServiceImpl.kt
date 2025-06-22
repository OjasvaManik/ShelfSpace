package net.ojm.backend.domain.service.impls.users

import net.ojm.backend.domain.extensions.FileUploadUtil
import net.ojm.backend.domain.repo.users.UserRepo
import net.ojm.backend.domain.service.interfaces.users.UserService
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import java.nio.file.Files
import java.nio.file.Paths

@Service
class UserServiceImpl (
    private val userRepo: UserRepo
): UserService {

    override fun uploadProfileImage(
        userId: Long,
        file: MultipartFile
    ): String {
        val user = userRepo.findById(userId).orElseThrow {
            IllegalArgumentException("User with ID $userId not found")
        }

        // Delete old profile image if exists
        user.profileImage?.let { existingPath ->
            val fullPath = Paths.get("Z:/shelf_space", existingPath).toAbsolutePath().normalize()
            try {
                if (Files.exists(fullPath)) {
                    Files.delete(fullPath)
                }
            } catch (ex: Exception) {
                println("Failed to delete old profile image: ${ex.message}")
            }
        }

        // Save new image
        val savedFileName = FileUploadUtil.saveImage(
            baseDirectory = "Z:/shelf_space/users/${user.userName}/profile_image",
            file = file
        )

        val newImagePath = "users/${user.userName}/profile_image/$savedFileName"
        val updatedUser = user.copy(profileImage = newImagePath)
        userRepo.save(updatedUser)

        return newImagePath
    }

}

package net.ojm.backend.domain.service.impls.users

import net.ojm.backend.domain.extensions.FileUploadUtil
import net.ojm.backend.domain.repo.users.UserRepo
import net.ojm.backend.domain.service.interfaces.users.UserService
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile

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

        val savedFileName = FileUploadUtil.saveImage(
            baseDirectory = "Z:/shelf_space/users/${user.userName}/profile_image",
            file = file
        )

        val updatedUser = user.copy(profileImage = savedFileName)
        userRepo.save(updatedUser)
        val imageUrl = "/users/${user.userName}/profile_image/$savedFileName"

        return imageUrl
    }
}

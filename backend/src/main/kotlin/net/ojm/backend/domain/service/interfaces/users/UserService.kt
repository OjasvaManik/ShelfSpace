package net.ojm.backend.domain.service.interfaces.users

import org.springframework.web.multipart.MultipartFile

interface UserService {

    fun uploadProfileImage(userId: Long, file: MultipartFile): String

}
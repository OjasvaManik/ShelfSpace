package net.ojm.backend.domain.dto.response.auth

import net.ojm.backend.constants.enums.UserRolesEnum

data class LoginResponse(

    val id: Long?,
    val userName: String,
    val email: String,
    val isWhitelisted: Boolean,
    val isBanned: Boolean,
    val token: String,
    val role: String,
    val profileImage: String? = null

)

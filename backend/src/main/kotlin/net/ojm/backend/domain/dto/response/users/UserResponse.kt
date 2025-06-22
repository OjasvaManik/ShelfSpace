package net.ojm.backend.domain.dto.response.users

data class UserResponse(

    val id: Long?,
    val userName: String,
    val email: String,
    val isWhitelisted: Boolean,
    val isBanned: Boolean,
    val role: String,
    val profileImage: String? = null

)

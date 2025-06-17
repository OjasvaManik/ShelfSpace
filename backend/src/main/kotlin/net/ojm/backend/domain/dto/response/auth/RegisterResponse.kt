package net.ojm.backend.domain.dto.response.auth

data class RegisterResponse(

    val id: Long?,
    val userName: String,
    val email: String,
    val isWhitelisted: Boolean,
    val isBanned: Boolean,

)

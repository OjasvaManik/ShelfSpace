package net.ojm.backend.domain.dto.request.auth

data class RegisterRequest(

    val userName: String,
    val email: String,
    val userPassword: String,

)

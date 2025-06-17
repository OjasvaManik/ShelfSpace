package net.ojm.backend.domain.service.interfaces.auth

import net.ojm.backend.domain.dto.request.auth.LoginRequest
import net.ojm.backend.domain.dto.request.auth.RegisterRequest
import net.ojm.backend.domain.dto.response.auth.LoginResponse
import net.ojm.backend.domain.dto.response.auth.RegisterResponse

interface AuthService {

    fun register(request: RegisterRequest): RegisterResponse

    fun login(request: LoginRequest): LoginResponse

}
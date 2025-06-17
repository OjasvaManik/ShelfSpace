package net.ojm.backend.controller.auth

import net.ojm.backend.domain.dto.request.auth.LoginRequest
import net.ojm.backend.domain.dto.request.auth.RegisterRequest
import net.ojm.backend.domain.dto.response.auth.LoginResponse
import net.ojm.backend.domain.dto.response.auth.RegisterResponse
import net.ojm.backend.domain.dto.response.success.SuccessResponse
import net.ojm.backend.domain.service.interfaces.auth.AuthService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/v1/auth")
class AuthController (
    val authService: AuthService
) {

    @PostMapping(path = ["/register"])
    fun register(@RequestBody request: RegisterRequest): ResponseEntity<SuccessResponse<RegisterResponse>> {
//        println("Received registration request: $request")
        val data = authService.register(request)

        val response = SuccessResponse(
            status = HttpStatus.CREATED.value(),
            message = "User registered successfully",
            data = data
        )
        return ResponseEntity(response, HttpStatus.CREATED)

    }

    @PostMapping(path = ["/login"])
    fun login(@RequestBody request: LoginRequest): ResponseEntity<SuccessResponse<LoginResponse>> {
        val data = authService.login(request)

        val response = SuccessResponse(
            status = HttpStatus.OK.value(),
            message = "User logged in",
            data = data
        )

        return ResponseEntity(response, HttpStatus.OK)
    }

}
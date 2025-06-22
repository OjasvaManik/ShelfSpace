package net.ojm.backend.domain.service.impls.auth

import net.ojm.backend.domain.dto.request.auth.LoginRequest
import net.ojm.backend.domain.dto.request.auth.RegisterRequest
import net.ojm.backend.domain.dto.response.auth.LoginResponse
import net.ojm.backend.domain.dto.response.auth.RegisterResponse
import net.ojm.backend.domain.dto.response.users.UserResponse
import net.ojm.backend.domain.entity.users.CustomUserDetails
import net.ojm.backend.domain.exception.BadRequestException
import net.ojm.backend.domain.mapper.toLoginResponse
import net.ojm.backend.domain.mapper.toRegisterResponse
import net.ojm.backend.domain.mapper.toUserEntity
import net.ojm.backend.domain.mapper.toUserResponse
import net.ojm.backend.domain.repo.users.UserRepo
import net.ojm.backend.domain.service.interfaces.auth.AuthService
import net.ojm.backend.jwt.JwtUtils
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.AuthenticationException
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class AuthServiceImpl (
    private val userRepo: UserRepo,
    private val passwordEncoder: PasswordEncoder,
    private val authenticationManager: AuthenticationManager,
    private val jwtUtils: JwtUtils,
): AuthService {

    override fun register(request: RegisterRequest): RegisterResponse {

        if (userRepo.findByUserName(request.userName) != null) {
            throw BadRequestException("User name already exists")
        }

        if (userRepo.findByEmail(request.email) != null) {
            throw BadRequestException("Email already exists")
        }

        val encodedPassword = passwordEncoder.encode(request.userPassword)
        val newUser = request.copy(userPassword = encodedPassword)

        userRepo.save(newUser.toUserEntity())

        val user = userRepo.findByEmail(request.email)
        if (user == null) {
            throw BadRequestException("User registration failed")
        }
        return user.toRegisterResponse()

    }

    override fun login(request: LoginRequest): LoginResponse {
        val user = userRepo.findByUserName(request.userName)
            ?: throw BadRequestException("Invalid username or password")

        if (!user.isWhitelisted)
            throw BadRequestException("User is not whitelisted")

        val authentication = try {
            authenticationManager.authenticate(
                UsernamePasswordAuthenticationToken(
                    request.userName,
                    request.userPassword
                )
            )
        } catch (ex: AuthenticationException) {
            throw BadRequestException("Invalid username or password")
        }

        SecurityContextHolder.getContext().authentication = authentication
        val userDetails = authentication.principal as CustomUserDetails
        val jwtToken = jwtUtils.generateTokenFromUsername(userDetails)
        val role = userDetails.authorities.first().authority

        return user.toLoginResponse(jwtToken, role)
    }

    override fun getCurrentUser(): UserResponse {
        val authentication = SecurityContextHolder.getContext().authentication
        val userDetails = authentication.principal as? CustomUserDetails
            ?: throw BadRequestException("Invalid token")

        val user = userRepo.findByUserName(userDetails.username)
            ?: throw BadRequestException("User not found")
        val role = userDetails.authorities.first().authority
        return user.toUserResponse(role)
    }


}
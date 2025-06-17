package net.ojm.backend.domain.mapper

import net.ojm.backend.constants.enums.UserRolesEnum
import net.ojm.backend.domain.dto.request.auth.RegisterRequest
import net.ojm.backend.domain.dto.response.auth.LoginResponse
import net.ojm.backend.domain.dto.response.auth.RegisterResponse
import net.ojm.backend.domain.entity.users.UserEntity

fun RegisterRequest.toUserEntity(): UserEntity {

    return UserEntity(
        userName = userName,
        email = email,
        userPassword = userPassword,
        isBanned = false,
        role = UserRolesEnum.ROLE_PLEB,
        isWhitelisted = false,
        profileImage = null
    )

}

fun UserEntity.toRegisterResponse(): RegisterResponse {

    return RegisterResponse(
        id = id,
        userName = userName,
        email = email,
        isWhitelisted = isWhitelisted,
        isBanned = isBanned
    )

}

fun UserEntity.toLoginResponse(jwtToken: String, role: String): LoginResponse {
    return LoginResponse(
        id = id,
        userName = userName,
        email = email,
        isWhitelisted = isWhitelisted,
        isBanned = isBanned,
        role = role,
        token = jwtToken,
        profileImage = profileImage ?: "https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-875.jpg?semt=ais_hybrid&w=740"
    )
}

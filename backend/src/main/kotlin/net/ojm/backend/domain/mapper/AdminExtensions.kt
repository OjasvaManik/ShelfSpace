package net.ojm.backend.domain.mapper

import net.ojm.backend.domain.dto.response.admin.AllUsersResponse
import net.ojm.backend.domain.entity.users.UserEntity

fun UserEntity.toAllUsersResponse(): AllUsersResponse {
    return AllUsersResponse(
        id = this.id,
        userName = this.userName,
        email = this.email,
        isWhitelisted = this.isWhitelisted,
        role = this.role,
        isBanned = this.isBanned
    )
}
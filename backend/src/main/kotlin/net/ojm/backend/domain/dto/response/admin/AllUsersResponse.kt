package net.ojm.backend.domain.dto.response.admin

import net.ojm.backend.constants.enums.UserRolesEnum

data class AllUsersResponse(

    val id: Long?,
    val userName: String,
    val role: UserRolesEnum,
    val email: String,
    val isWhitelisted: Boolean,
    val isBanned: Boolean,

    )

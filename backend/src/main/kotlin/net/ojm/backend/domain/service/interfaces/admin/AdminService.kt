package net.ojm.backend.domain.service.interfaces.admin

import net.ojm.backend.domain.dto.request.common.CommonRequest
import net.ojm.backend.domain.dto.response.admin.AllUsersResponse

interface AdminService {

    fun getAllUsers(): List<AllUsersResponse>

}
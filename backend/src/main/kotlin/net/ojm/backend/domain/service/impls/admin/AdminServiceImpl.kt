package net.ojm.backend.domain.service.impls.admin

import net.ojm.backend.domain.dto.request.common.CommonRequest
import net.ojm.backend.domain.dto.response.admin.AllUsersResponse
import net.ojm.backend.domain.mapper.toAllUsersResponse
import net.ojm.backend.domain.repo.users.UserRepo
import net.ojm.backend.domain.service.interfaces.admin.AdminService
import org.springframework.stereotype.Service

@Service
class AdminServiceImpl (
    private val userRepo: UserRepo
): AdminService {

    override fun getAllUsers(): List<AllUsersResponse> {

        val users = userRepo.findAll()
        return users.map { user -> user.toAllUsersResponse() }

    }

}
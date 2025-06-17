package net.ojm.backend.controller.admin

import net.ojm.backend.domain.dto.request.common.CommonRequest
import net.ojm.backend.domain.dto.response.admin.AllUsersResponse
import net.ojm.backend.domain.dto.response.success.SuccessResponse
import net.ojm.backend.domain.service.interfaces.admin.AdminService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/v1/admin")
class AdminController (
    private val adminService: AdminService
) {

    @GetMapping(path = ["/users"])
    fun getUsers(): ResponseEntity<SuccessResponse<List<AllUsersResponse>>> {
        val users = adminService.getAllUsers()
        val response = SuccessResponse(
            status = 200,
            message = "Users fetched successfully",
            data = users
        )
        return ResponseEntity.ok(response)
    }

}
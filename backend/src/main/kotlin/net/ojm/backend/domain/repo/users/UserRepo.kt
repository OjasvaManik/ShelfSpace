package net.ojm.backend.domain.repo.users

import net.ojm.backend.domain.dto.response.admin.AllUsersResponse
import net.ojm.backend.domain.entity.users.UserEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.stereotype.Repository

@Repository
interface UserRepo: JpaRepository<UserEntity, Long> {

    fun findByUserName(userName: String): UserEntity?

    fun findByEmail(email: String): UserEntity?

//    fun getAllUsers(): List<UserEntity>

}
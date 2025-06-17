package net.ojm.backend.domain.service.impls.users

import net.ojm.backend.domain.entity.users.CustomUserDetails
import net.ojm.backend.domain.repo.users.UserRepo
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service

@Service
class CustomUserDetailsServiceImpl(
    private val userRepo: UserRepo
) : UserDetailsService {

    override fun loadUserByUsername(username: String): UserDetails {
        val user = userRepo.findByUserName(username)
            ?: throw UsernameNotFoundException("User not found with username: $username")
        return CustomUserDetails(user)
    }
}
package net.ojm.backend.domain.entity.users

import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails

class CustomUserDetails(
    private val user: UserEntity
) : UserDetails {

    override fun getAuthorities(): Collection<GrantedAuthority> {
        return listOf(SimpleGrantedAuthority(user.role.name))
    }


    override fun getPassword(): String = user.userPassword
    override fun getUsername(): String = user.userName
    override fun isAccountNonExpired(): Boolean = true
    override fun isAccountNonLocked(): Boolean = true
    override fun isCredentialsNonExpired(): Boolean = true
    override fun isEnabled(): Boolean = user.isWhitelisted

    fun getUserId() = user.id
    fun getUserEntity() = user
}
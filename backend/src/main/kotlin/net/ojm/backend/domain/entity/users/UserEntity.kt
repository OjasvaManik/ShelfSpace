package net.ojm.backend.domain.entity.users

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.EnumType
import jakarta.persistence.Enumerated
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import net.ojm.backend.constants.enums.UserRolesEnum
import net.ojm.backend.domain.common.BaseTimeEntity
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails

@Entity
@Table(name = "users")
data class UserEntity(

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    val id: Long? = null,

    @Column(name = "user_name", nullable = false, unique = true)
    val userName: String,

    @Column(name = "password", nullable = false)
    val userPassword: String,

    @Column(name = "email", unique = true, nullable = false)
    val email: String,

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    val role: UserRolesEnum = UserRolesEnum.ROLE_PLEB,

    @Column(name = "profile_image")
    val profileImage: String? = null,

    @Column(name = "is_banned", nullable = false)
    val isBanned: Boolean = false,

    @Column(name = "is_whitelisted", nullable = false)
    val isWhitelisted: Boolean = false

): BaseTimeEntity(), UserDetails {

    override fun getAuthorities(): MutableCollection<out GrantedAuthority> {
        return mutableListOf(SimpleGrantedAuthority(role.name))
    }

    override fun getPassword(): String = userPassword

    override fun getUsername(): String = userName

    override fun isAccountNonExpired(): Boolean = true

    override fun isAccountNonLocked(): Boolean = !isBanned

    override fun isCredentialsNonExpired(): Boolean = true

    override fun isEnabled(): Boolean = isWhitelisted

}

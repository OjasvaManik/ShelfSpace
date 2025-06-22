package net.ojm.backend.domain.entity.guides

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.Id
import jakarta.persistence.Table
import net.ojm.backend.domain.common.BaseTimeEntity
import java.util.UUID

@Entity
@Table(name = "guides")
data class GuideEntity(

    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false, unique = true)
    val id: UUID = UUID.randomUUID(),

    @Column(name = "title", nullable = false)
    val title: String,

    @Column(name = "summary", nullable = false)
    val summary: String,

    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
    val description: String,

): BaseTimeEntity()

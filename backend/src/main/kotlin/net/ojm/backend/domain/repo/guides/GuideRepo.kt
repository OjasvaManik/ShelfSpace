package net.ojm.backend.domain.repo.guides

import net.ojm.backend.domain.entity.guides.GuideEntity
import org.springframework.data.domain.Sort
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.UUID

@Repository
interface GuideRepo : JpaRepository<GuideEntity, UUID> {
    override fun findAll(sort: Sort): List<GuideEntity>
}
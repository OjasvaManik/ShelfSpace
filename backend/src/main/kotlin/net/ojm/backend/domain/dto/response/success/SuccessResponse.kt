package net.ojm.backend.domain.dto.response.success

data class SuccessResponse<T>(
    val status: Int,
    val message: String,
    val data: T? = null,
    val timestamp: Long = System.currentTimeMillis()
)

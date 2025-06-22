package net.ojm.backend.domain.extensions

import org.springframework.web.multipart.MultipartFile
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.Paths
import java.nio.file.StandardCopyOption
import java.util.*

object FileUploadUtil {

    private val imageExtensions = setOf("jpg", "jpeg", "png", "svg", "webp", "gif")

    fun saveImage(
        baseDirectory: String,  // e.g., "Z:/shelf_space/users/profile_image"
        file: MultipartFile
    ): String {
        val originalName = file.originalFilename
            ?: throw IllegalArgumentException("File must have a name")

        val ext = originalName.substringAfterLast('.', "").lowercase()
        if (ext !in imageExtensions) {
            throw IllegalArgumentException("Invalid file type: .$ext is not allowed")
        }

        val dirPath: Path = Paths.get(baseDirectory).toAbsolutePath().normalize()
        if (!Files.exists(dirPath)) {
            Files.createDirectories(dirPath)
        }

        val fileName = "${UUID.randomUUID()}.$ext"
        val filePath = dirPath.resolve(fileName)

        file.inputStream.use { input ->
            Files.copy(input, filePath, StandardCopyOption.REPLACE_EXISTING)
        }

        return fileName // You can return the full path if needed
    }
}
package net.ojm.backend.config

import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@Configuration
class WebConfig : WebMvcConfigurer {

    override fun addResourceHandlers(registry: ResourceHandlerRegistry) {
        registry.addResourceHandler("/users/**")
            .addResourceLocations("file:Z:/shelf_space/users/")
            .setCachePeriod(3600)

        super.addResourceHandlers(registry)
    }
}
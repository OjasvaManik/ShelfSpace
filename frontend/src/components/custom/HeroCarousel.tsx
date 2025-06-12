'use client'

import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from 'embla-carousel-autoplay'

const images = [
    { src: '/images/onepiece.jpg', alt: 'onepiece' },
    { src: '/images/horimiya.webp', alt: 'horimiya' },
    { src: '/images/iruma.jpg', alt: 'iruma' },
    { src: '/images/mashle.jpg', alt: 'mashle' },
    { src: '/images/tokyoraven.jpg', alt: 'tokyoraven' },
    { src: '/images/dxd.jpeg', alt: 'dxd' },
    { src: '/images/carry.jpg', alt: 'dxd' },
    { src: '/images/lumiere.jpg', alt: 'lumiere' },
    { src: '/images/apocalypse.jpeg', alt: 'apocalypse' },
]

const HeroCarousel = () => {
    return (
        <div className="overflow-hidden pointer-events-none">
            <Carousel
                opts={{
                    loop: true,
                }}
                plugins={[
                    Autoplay({
                        delay: 2000,
                        stopOnInteraction: false,
                    }),
                ]}
                className="w-screen pl-23 lg:pl-0"
            >
                <CarouselContent className="opacity-40">
                    {images.map((image, index) => (
                        <CarouselItem key={index} className="lg:basis-1/6">
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="object-cover h-90 w-60"
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    )
}

export default HeroCarousel

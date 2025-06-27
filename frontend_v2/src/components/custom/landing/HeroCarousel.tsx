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
    { src: '/images/ad.jpg', alt: 'ad' },
    { src: '/images/carry.jpg', alt: 'dxd' },
    { src: '/images/lumiere.jpg', alt: 'lumiere' },
    { src: '/images/apocalypse.jpeg', alt: 'apocalypse' },
    { src: '/images/bg3.jpg', alt: 'bg3' },
    { src: '/images/e33.webp', alt: 'e33' },
    { src: '/images/genshin.jpeg', alt: 'genshin' },
]

const HeroCarousel = () => {
    return (
        <div className="overflow-hidden lg:px-0">
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
                className="w-full"
            >
                <CarouselContent>
                    {images.map((image, index) => (
                        <CarouselItem key={index} className="basis-full lg:basis-1/6 flex justify-center">
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-60 h-90 lg:w-full lg:h-[400px] object-cover mx-auto"
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>

            </Carousel>

        </div>
    )
}

export default HeroCarousel

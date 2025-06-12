'use client'

import React from 'react'
import Noise from "@/components/bits/Noise/Noise";
import HeroCarousel from "@/components/custom/HeroCarousel";
import SearchBar from "@/components/custom/SearchBar";
import Menu from "@/components/custom/Menu";
import {Button} from "@/components/ui/button";

const Hero = () => {
    return (
        <div className="relative w-full h-[400px] lg:h-[400px] overflow-hidden">
            <div className="absolute top-1/7 lg:top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-2xl font-bold z-20">
                <SearchBar>
                    <Menu>
                        <Button className={'rounded-full bg-amber-500 w-5 h-8 hover:bg-white hover:text-amber-500'}>
                            M
                        </Button>
                    </Menu>
                </SearchBar>
            </div>
            <div className={'absolute top-1/2 lg:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-2xl font-bold z-20 ml-1'}>
                <p className={'lg:text-4xl font-bold z-20 text-white mt-2'}>
                    ShelfSpace
                </p>
                <p className={'lg:text-2xl text-amber-500/75 z-20'}>
                    Your one-stop solution for all digital shelf space needs
                </p>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-2xl font-bold z-10 pointer-events-none">
                <HeroCarousel />
            </div>
            <div className="z-50 opacity-100 w-screen h-auto">
                <Noise
                    patternSize={250}
                    patternScaleX={1}
                    patternScaleY={1}
                    patternRefreshInterval={2}
                    patternAlpha={15}
                />
            </div>
        </div>

    )
}
export default Hero

'use client'

import React from 'react';
import HeroCarousel from "@/components/custom/landing/HeroCarousel";

const Landing = () => {
    return (
        <div className={'w-full h-full py-4 flex items-center flex-col justify-between'}>
            <div className="w-fulloverflow-hidden pb-2">
                <div className="text-white text-2xl font-boldtext-center ml-4 lg:ml-0 mb-2">
                    <p className="lg:text-4xl font-bold text-amber-500 mt-2">
                        ShelfSpace
                    </p>
                    <p className="lg:text-2xl text-white/75">
                        Your one-stop solution for all digital shelf space needs
                    </p>
                </div>
                <div className={'border-y-4 py-2'}>
                    <HeroCarousel />
                </div>
            </div>
            <div className={'border-y-4 border-amber-500 rounded-lg p-4 mt-8 lg:mt-0'}>
                <p className="text-white text-center mt-4 ml-4 lg:ml-0">
                    Welcome to ShelfSpace, where you can manage your favorite movies, series, and anime all in one place.
                </p>
                <p className="text-center text-amber-500 mt-2">
                    Enjoy everything, anywhere, anytime, all at once.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-white mt-10 mb-2">
                <div>
                    <h3 className="text-xl font-semibold">🎥 Movie Tracker</h3>
                    <p className="text-sm text-white/70">Organize everything you&#39;ve watched or want to watch.</p>
                </div>
                <div>
                    <h3 className="text-xl font-semibold">📚 Manga Library</h3>
                    <p className="text-sm text-white/70">Bookmark chapters, rate your reads.</p>
                </div>
                <div>
                    <h3 className="text-xl font-semibold">🔐 Private Storage</h3>
                    <p className="text-sm text-white/70">Secure, offline-hosted content. Yours only.</p>
                </div>
            </div>
        </div>
    );
};

export default Landing;

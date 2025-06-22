'use client'

import GuideNav from "@/components/custom/GuideNav";
import React from "react";
import { useEffect, useRef, useState } from 'react'

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    const stickyRef = useRef<HTMLDivElement>(null)
    const [isSticky, setIsSticky] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (!stickyRef.current) return
            const { top } = stickyRef.current.getBoundingClientRect()
            setIsSticky(top <= 0)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div>
            <div
                ref={stickyRef}
                className={`border-b-4 border-white rounded p-4 h-fit sticky top-0 z-50 transition-colors duration-300 ${
                    isSticky ? 'bg-black/90' : 'bg-transparent'
                }`}
            >
                <GuideNav />
            </div>
            {children}
        </div>
    );
}
'use client'

import React from 'react'
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from 'next/navigation';

const GuideNav = () => {
    const pathname = usePathname();
    const isGuidePage = pathname === '/guides';
    const isGuideViewPage = pathname.match(/^\/guides\/[^\/]+$/) && !pathname.includes('/create') && !pathname.includes('/edit');

    return (
        <nav>
            <div className="flex flex-col items-center justify-center mt-4 gap-4 w-full">
                <div className="flex gap-4">
                    <Link href="/guides">
                        <Button variant="secondary" className="bg-transparent hover:bg-white hover:text-black drop-shadow-2xl shadow-black text-white">
                            All Guides
                        </Button>
                    </Link>
                    <Link href="/guides/create">
                        <Button variant="secondary" className="bg-transparent hover:bg-white hover:text-black drop-shadow-2xl shadow-black text-white">
                            Create
                        </Button>
                    </Link>
                    {isGuideViewPage && (
                        <Link href={`${pathname}/edit`}>
                            <Button variant="secondary" className="bg-transparent hover:bg-white hover:text-black drop-shadow-2xl shadow-black text-white">
                                Edit
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default GuideNav
import React from 'react'
import {Button} from "@/components/ui/button";
import Link from "next/link";

const GuideNav = () => {
    return (
        <nav>
            <div className={'flex items-center justify-center gap-4'}>
                <Link href={'/guides'}>
                    <Button variant={'secondary'} className={'bg-transparent hover:bg-white hover:text-black drop-shadow-2xl shadow-black text-white'}>
                        All Guides
                    </Button>
                </Link>
                <Link href={'/create'}>
                    <Button variant={'secondary'} className={'bg-transparent hover:bg-white hover:text-black drop-shadow-2xl shadow-black text-white'}>
                        Create
                    </Button>
                </Link>
            </div>
        </nav>
    )
}
export default GuideNav

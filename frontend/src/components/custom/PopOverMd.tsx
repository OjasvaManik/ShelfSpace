'use client'

import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {menu} from "../../../data/menu";
import Link from "next/link";

export function PopOverMd() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="link" className={'text-white border-2 rounded-md'}>Menu</Button>
            </PopoverTrigger>
                <PopoverContent className="my-19 w-full border-2 rounded-md bg-transparent text-white" side={'right'}>
                    <div className={`grid gap-2 lg:grid-cols-14 md:grid-cols-5`}>
                        {menu.map((item, index) => (
                            <Button key={index} className={'text-background'} variant={'link'}>
                                <Link href={item.path}>
                                        {item.title}
                                </Link>
                            </Button>
                        ))}
                    </div>
                </PopoverContent>
        </Popover>
    )
}

'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {menu} from "../../../data/menu";
import Link from "next/link";
import { Separator } from "@/components/ui/separator"

const Menu = (
    { children }: { children?: React.ReactNode }
) => {
    return (
        <Drawer >
            <DrawerTrigger asChild>
                {children}
            </DrawerTrigger>
                <DrawerContent className="bg-black border-amber-500 max-w-xl w-full mx-auto rounded-t-xl">
                    <div className="mx-auto w-full flex flex-col items-center">
                        <div className="w-full">
                            <div className="w-full">
                                <div>
                                    <DrawerHeader>
                                        <DrawerTitle className="text-amber-500">Account</DrawerTitle>
                                        <DrawerDescription>Check your details</DrawerDescription>
                                    </DrawerHeader>
                                    <div className={'justify-center items-center flex flex-col'}>
                                        <Separator className="mb-4" />
                                        <div className="space-y-1">
                                            <h4 className="text-sm leading-none font-medium text-center">Radix Primitives</h4>
                                            <p className="text-muted-foreground text-sm">
                                                An open-source UI component library.
                                            </p>
                                        </div>
                                        <Separator className="my-4" />
                                        <div className="flex h-5 items-center space-x-4 text-sm">
                                            <div>Blog</div>
                                            <Separator orientation="vertical" />
                                            <div>Docs</div>
                                            <Separator orientation="vertical" />
                                            <div>Source</div>
                                        </div>
                                        <Separator className="my-4" />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full">
                                <div>
                                    <DrawerHeader>
                                        <DrawerTitle className={'text-amber-500'}>Menu</DrawerTitle>
                                        <DrawerDescription>Move through pages</DrawerDescription>
                                    </DrawerHeader>
                                </div>
                                <div className={'flex justify-evenly flex-wrap'}>
                                    {menu.map((item, index) => (
                                        <Button key={index} className="text-background" variant="link">
                                            <Link href={item.path}>{item.title}</Link>
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <DrawerFooter className={''}>
                            <DrawerClose asChild>
                                <Button className={'text-white bg-amber-500 hover:bg-white border-none hover:text-amber-500 min-w-sm'} variant="outline">Cancel</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </div>
                </DrawerContent>
        </Drawer>
    )
}
export default Menu

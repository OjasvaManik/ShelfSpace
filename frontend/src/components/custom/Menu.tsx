'use client'

import React, { useEffect, useRef, isValidElement, cloneElement,} from 'react'
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
import { Separator } from "@/components/ui/separator"
import MainMenu from "@/components/custom/MainMenu";

const Menu = ({
                  children,
                  content,
    title,
    description,
              }: {
    children?: React.ReactNode
    content?: React.ReactNode
    title?: string
    description?: string
}) => {
    const triggerRef = useRef<HTMLButtonElement>(null)
    //
    // useEffect(() => {
    //     const handleKeyDown = (e: KeyboardEvent) => {
    //         const target = e.target as HTMLElement
    //
    //         // Skip if typing in an input, textarea, or contenteditable element
    //         if (
    //             target.tagName === 'INPUT' ||
    //             target.tagName === 'TEXTAREA' ||
    //             target.isContentEditable
    //         ) {
    //             return
    //         }
    //
    //         if (e.key.toLowerCase() === 'm' && !e.ctrlKey && !e.metaKey && !e.altKey) {
    //             e.preventDefault()
    //             triggerRef.current?.click()
    //         }
    //     }
    //
    //     window.addEventListener('keydown', handleKeyDown)
    //     return () => window.removeEventListener('keydown', handleKeyDown)
    // }, [])


    const injectedChild = isValidElement(children)
        ? cloneElement(children, { ref: triggerRef })
        : null

    return (
        <Drawer>
            <DrawerTrigger asChild>
                {injectedChild}
            </DrawerTrigger>
            <DrawerContent className="bg-black border-amber-500 max-w-xl w-full mx-auto rounded-t-xl">
                <div className="mx-auto w-full flex flex-col items-center">
                    <div className="w-full">
                        <DrawerHeader>
                            <DrawerTitle className="text-amber-500">{title ?? "Account"}</DrawerTitle>
                            <DrawerDescription>{description ?? "Check your details"}</DrawerDescription>
                        </DrawerHeader>
                        <Separator className="mb-4" />
                        <div>
                            {content ? (
                                <div className="w-full">{content}</div>
                            ) : (
                                <MainMenu />
                            )}
                        </div>
                        <DrawerFooter>
                            <DrawerClose asChild>
                                <Button className="text-white bg-amber-500 hover:bg-white border-none hover:text-amber-500">
                                    Cancel
                                </Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export default Menu

'use client'

import React, { useEffect, useRef, isValidElement, cloneElement, useState } from 'react'
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
import { menu } from "../../../data/menu"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"

const Menu = ({ children }: { children?: React.ReactNode }) => {
    const router = useRouter()
    const triggerRef = useRef<HTMLButtonElement>(null)

    const [user, setUser] = useState<any>(null)
    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key.toLowerCase() === 'm' && !e.ctrlKey && !e.metaKey && !e.altKey) {
                e.preventDefault()
                triggerRef.current?.click()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    useEffect(() => {
        const storedToken = localStorage.getItem('token')
        const storedUser = localStorage.getItem('user')

        if (storedToken && storedUser) {
            setToken(storedToken)
            setUser(JSON.parse(storedUser))
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        toast.success("Logout successful")
        router.push('/login')
    }

    const injectedChild = isValidElement(children)
        ? cloneElement(children, { ref: triggerRef })
        : null

    // const handleImageUpload = () => {
    //     try {
    //         const response = await axios.post('http://100.81.212.125:8080/api/v1/users/upload-profile-image', data)
    //         const userData = response.data.data
    //     }
    // }

    return (
        <Drawer>
            <DrawerTrigger asChild>
                {injectedChild}
            </DrawerTrigger>
            <DrawerContent className="bg-black border-amber-500 max-w-xl w-full mx-auto rounded-t-xl">
                <div className="mx-auto w-full flex flex-col items-center">
                    <div className="w-full">
                        <DrawerHeader>
                            <DrawerTitle className="text-amber-500">Account</DrawerTitle>
                            <DrawerDescription>Check your details</DrawerDescription>
                        </DrawerHeader>
                        <Separator className="mb-4" />
                        <div className="justify-center items-center flex flex-col">
                            <div className="space-y-1 flex gap-5 justify-center items-center">
                                {token && (
                                    <Avatar>
                                        <AvatarImage src={user?.profileImage} />
                                        <AvatarFallback>{user?.userName?.[0]?.toUpperCase() ?? 'U'}</AvatarFallback>
                                    </Avatar>
                                )}
                                <div>
                                    <h4 className="text-sm leading-none font-medium text-center mb-2">
                                        {token ? user?.userName : 'Not logged in'}
                                    </h4>
                                    {token && (
                                        user?.role === 'ROLE_ADMIN' ? (
                                            <Link href="/admin">
                                                <Badge variant="secondary">ADMIN</Badge>
                                            </Link>
                                        ) : user?.role === 'ROLE_PLEB' ? (
                                            <Badge variant="outline" className="text-white">PLEB</Badge>
                                        ) : null
                                    )}
                                </div>
                            </div>
                            <Separator className="my-4" />
                            <div className="flex items-center space-x-4 text-sm flex-col w-full">
                                <div className={'flex gap-2'}>
                                    {token && (
                                        <div className="flex gap-2 w-full justify-center items-center">
                                            <Separator orientation="vertical" />
                                            <Link href="/favorites" className="hover:border-b-2">Favourites</Link>
                                            <Separator orientation="vertical" />
                                            <Link href="/trash" className="hover:border-b-2">Trash</Link>
                                        </div>
                                    )}
                                    <div className={'flex gap-2'}>
                                        <Separator orientation="vertical" />
                                        <Link href={'/docs'} className={'hover:border-b-2'}>Docs</Link>
                                        <Separator orientation="vertical" />
                                    </div>
                                </div>
                                <Separator className="my-4" />
                                <div className="flex w-full justify-center gap-4 items-center">
                                    {token && (
                                        <>
                                            <Button className="text-white bg-amber-500 hover:bg-white border-none hover:text-amber-500 hover:cursor-pointer active:bg-white active:text-amber-500">
                                                Set Profile Image
                                            </Button>
                                            <Separator orientation="vertical" />
                                            <DrawerClose asChild>
                                                <Button onClick={handleLogout} className="text-white bg-amber-500 hover:bg-white border-none hover:text-amber-500 hover:cursor-pointer active:bg-white active:text-amber-500">
                                                    Logout
                                                </Button>
                                            </DrawerClose>
                                        </>
                                    )}
                                </div>
                            </div>
                            <Separator className="mt-4" />
                        </div>
                        <DrawerHeader>
                            <DrawerTitle className="text-amber-500">Menu</DrawerTitle>
                            <DrawerDescription>Move through pages</DrawerDescription>
                        </DrawerHeader>
                        <div className="flex justify-evenly flex-wrap">
                            {menu.map((item, index) => (
                                <Button key={index} className="text-background hover:text-amber-500 active:text-amber-500" variant="link">
                                    <Link href={item.path}>{item.title}</Link>
                                </Button>
                            ))}
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

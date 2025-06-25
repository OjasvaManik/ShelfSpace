'use client'

import React, {useEffect, useState} from 'react'
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Home, LogIn, LogOut, Search, UserPlus} from "lucide-react";
import Link from "next/link";
import {AccordionMenu} from "@/components/custom/menu/AccordianMenu";
import {toast} from "sonner";
import {useRouter} from 'next/navigation'
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Image from "next/image";
import {Badge} from "@/components/ui/badge";

const SideMenu = () => {
    const router = useRouter()

    const [user, setUser] = useState<any>(null)
    const [token, setToken] = useState<string | null>(null)

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
        setUser(null)
        setToken(null)
        toast.success("Logout successful")
        router.push('/login')
    }

    useEffect(() => {
        const loadUser = () => {
            const storedToken = localStorage.getItem('token')
            const storedUser = localStorage.getItem('user')

            if (storedToken && storedUser) {
                setToken(storedToken)
                setUser(JSON.parse(storedUser))
            } else {
                setToken(null)
                setUser(null)
            }
        }

        loadUser()
        window.addEventListener('storage', loadUser)

        return () => {
            window.removeEventListener('storage', loadUser)
        }
    }, [])

    return (
        <div className="flex flex-col h-full w-full">
            {/* Top Section */}
            <div>
                <p className="font-extrabold text-white text-center px-5 pt-3 text-3xl shadow-md w-full">
                    Shelf Space
                </p>
                <div className="flex flex-col items-center justify-center mt-4">
                    <div className="flex justify-center items-center px-5 gap-2">
                        <Input
                            placeholder="search here"
                            className="outline-0 border-none bg-gray-700 rounded-full text-white text-xs h-10"
                        />
                        <Button className="rounded-full w-10 h-10 bg-gray-700">
                            <Search />
                        </Button>
                    </div>
                </div>
                <div className="mt-4 px-5">
                    <Link href="/">
                        <Button className="rounded-full w-full h-10 bg-gray-700">
                            <Home /> Home
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Scrollable accordion (if logged in), else spacer */}
            <div className="flex-1 overflow-y-auto mt-4 px-5 scrollbar-hide w-full">
                {token ? <AccordionMenu /> : <div className="h-full" />}
            </div>

            {/* Bottom Section */}
            <div className="px-5 mb-4">
                {token ? (
                    <div className="flex flex-col items-center justify-center w-full gap-4">
                        <Link href="/profile" className="w-full text-white">
                            <div className="flex gap-4 items-center justify-center bg-gray-700 rounded-full p-2">
                                <Avatar className="w-13 h-13">
                                    {user?.profileImage ? (
                                        <div className="w-32 aspect-square relative">
                                            <AvatarImage
                                                src={`http://100.81.212.125:8080/${user.profileImage}`}
                                                alt="Profile"
                                                onError={(e) => {
                                                    e.currentTarget.src =
                                                        'https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-875.jpg?semt=ais_hybrid&w=740'
                                                }}
                                                className="rounded-full object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <Image
                                            src="https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-875.jpg?semt=ais_hybrid&w=740"
                                            alt="Default Profile"
                                            width={128}
                                            height={128}
                                        />
                                    )}
                                    <AvatarFallback>{user?.userName?.[0]?.toUpperCase() ?? 'U'}</AvatarFallback>
                                </Avatar>
                                <div className={'flex flex-col items-center justify-center bg-black rounded-lg p-2 '}>
                                    <h4 className="text-sm leading-none font-medium text-center mb-2">
                                        {user?.userName}
                                    </h4>
                                    {user?.role === 'ROLE_ADMIN' ? (
                                        <Badge variant="secondary">ADMIN</Badge>
                                    ) : user?.role === 'ROLE_PLEB' ? (
                                        <Badge variant="outline" className="text-white">PLEB</Badge>
                                    ) : null}
                                </div>
                            </div>
                        </Link>
                        <Button onClick={handleLogout} className="rounded-full w-full h-10 bg-gray-700">
                            <LogOut /> Logout
                        </Button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center w-full gap-4">
                        <Link href="/login" className="w-full">
                            <Button className="rounded-full w-full h-10 bg-gray-700">
                                <LogIn /> Login
                            </Button>
                        </Link>
                        <Link href="/register" className="w-full">
                            <Button className="rounded-full w-full h-10 bg-gray-700">
                                <UserPlus /> Register
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SideMenu

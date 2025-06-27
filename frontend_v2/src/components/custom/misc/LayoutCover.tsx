'use client'

import React, { ReactNode, useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { MenuIcon, Search } from "lucide-react"
import SideMenu from "@/components/custom/menu/SideMenu"
import axios from "axios"
import TopMenu from "@/components/custom/menu/TopMenu"
import Link from "next/link"
import { Input } from "@/components/ui/input"

const LayoutCover = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<any>(null)
    const [searching, setSearching] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) return
        axios.get("http://100.81.212.125:8080/api/v1/auth/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                localStorage.setItem("user", JSON.stringify(res.data.data))
                setUser(res.data.data)
            })
            .catch((err) => {
                console.error("Failed to fetch user:", err)
                localStorage.removeItem("user")
                localStorage.removeItem("token")
            })
    }, [])

    return (
        <div>
            <div className="">
                {/* Sidebar */}
                <div className="fixed top-5 left-5 bg-gradient-to-tr from-pink-700 text-orange-700 h-[calc(100vh-2.5rem)] w-56 rounded-tl-3xl rounded-bl-3xl z-10 border-8 hidden lg:block border-white">
                    <SideMenu />
                </div>

                {/* Top bar for mobile */}
                <div className="flex items-center justify-between px-3 mt-3 lg:hidden gap-3">
                    {searching ? (
                        <Input
                            autoFocus
                            placeholder="Search..."
                            className="flex-1 rounded-3xl p-3 shadow-lg outline-0 border-0 bg-white text-black h-13"
                            onBlur={() => setSearching(false)}
                        />
                    ) : (
                        <div className="flex-1 bg-white text-black rounded-3xl p-3 shadow-lg">
                            <Link href="/">
                                <p className="font-extrabold text-center text-xl">
                                    Shelf Space
                                </p>
                            </Link>
                        </div>
                    )}
                    <Button
                        onClick={() => setSearching(true)}
                        className="rounded-full w-13 h-13 bg-white text-black"
                    >
                        <Search />
                    </Button>
                    <TopMenu>
                        <Button className="rounded-full w-13 h-13 bg-white text-black">
                            <MenuIcon />
                        </Button>
                    </TopMenu>
                </div>
            </div>

            {children}
        </div>
    )
}

export default LayoutCover

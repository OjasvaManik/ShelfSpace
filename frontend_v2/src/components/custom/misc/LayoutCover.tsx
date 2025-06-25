    'use client'

    import React, {ReactNode, useEffect} from 'react'
    import {Button} from "@/components/ui/button";
    import {MenuIcon, Search} from "lucide-react";
    import SideMenu from "@/components/custom/menu/SideMenu";
    import axios from "axios";
    import TopMenu from "@/components/custom/menu/TopMenu";

    const LayoutCover = ({
        children,
                         } : { children: ReactNode }) => {
        const [user, setUser] = React.useState<any>(null)

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
                    setUser(res.data.data) // wherever you store in state
                })
                .catch((err) => {
                    console.error("Failed to fetch user:", err)
                    localStorage.removeItem("user")
                    localStorage.removeItem("token")
                })
        }, [])


        return (
            <div>
                <div className={''}>
                    {/* Sidebar / label */}
                    <div className="fixed top-5 left-5 bg-black h-[calc(100vh-2.5rem)] w-56 rounded-tl-3xl rounded-bl-3xl z-10 border-r-8 hidden lg:block">
                        <SideMenu />
                    </div>
                    <div className="flex items-center justify-between px-3 mt-3 lg:hidden gap-3">
                        <div className="flex-1 bg-black rounded-3xl p-3 shadow-lg">
                            <p className="font-extrabold text-white text-center text-xl">
                                Shelf Space
                            </p>
                        </div>
                        <Button className="rounded-full w-13 h-13 bg-black">
                            <Search />
                        </Button>
                        <TopMenu>
                            <Button className="rounded-full w-13 h-13 bg-black">
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

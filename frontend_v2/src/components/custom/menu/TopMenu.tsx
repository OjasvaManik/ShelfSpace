import React, {ReactNode, useEffect, useState} from 'react'
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
import { Button } from "@/components/ui/button"
import Link from "next/link";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Image from "next/image";
import {Badge} from "@/components/ui/badge";
import {Home, LogIn, LogOut, UserPlus} from "lucide-react";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import {AccordionMenu} from "@/components/custom/menu/AccordianMenu";

const TopMenu = ({children} : {children : ReactNode}) => {
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
        <div>
            <Drawer>
                <DrawerTrigger>{children}</DrawerTrigger>
                <DrawerContent className={'bg-black/90 text-white'}>
                    <DrawerHeader>
                        <DrawerTitle className={'text-white'}>Menu</DrawerTitle>
                        <DrawerDescription>Travel through the site</DrawerDescription>
                    </DrawerHeader>
                    <div className="px-5 mb-4">
                        {token ? (
                            <div className="flex items-center justify-center gap-4">
                                <Link href="/profile">
                                    <div className="w-[150px] h-[60px] bg-gray-700 rounded-lg p-2 pr-4 flex gap-4 items-center">
                                        <Avatar className="w-12 h-12">
                                            {user?.profileImage ? (
                                                <AvatarImage
                                                    src={`http://100.81.212.125:8080/${user.profileImage}`}
                                                    alt="Profile"
                                                    onError={(e) => {
                                                        e.currentTarget.src =
                                                            'https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-875.jpg?semt=ais_hybrid&w=740'
                                                    }}
                                                    className="rounded-full object-cover"
                                                />
                                            ) : (
                                                <Image
                                                    src="https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-875.jpg?semt=ais_hybrid&w=740"
                                                    alt="Default Profile"
                                                    width={48}
                                                    height={48}
                                                />
                                            )}
                                            <AvatarFallback>{user?.userName?.[0]?.toUpperCase() ?? 'U'}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <h4 className="text-sm font-medium">{user?.userName}</h4>
                                            {user?.role === 'ROLE_ADMIN' ? (
                                                <Badge variant="secondary">ADMIN</Badge>
                                            ) : user?.role === 'ROLE_PLEB' ? (
                                                <Badge variant="outline" className="text-white">PLEB</Badge>
                                            ) : null}
                                        </div>
                                    </div>
                                </Link>

                                <Link href="/">
                                    <Button
                                        className="bg-gray-700 text-white w-[150px] h-[60px] rounded-lg flex items-center justify-center"
                                    >
                                        <Home />
                                        Home
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            ''
                        )}
                    </div>
                    {token ? (
                        <div>
                            <AccordionMenu />
                        </div>
                    ) : ''}
                    <DrawerFooter>
                        <DrawerClose>
                            {token ? (
                                <Button onClick={handleLogout} className="rounded-full w-full h-10 bg-gray-700">
                                    <LogOut /> Logout
                                </Button>
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
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    )
}
export default TopMenu

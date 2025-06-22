import React, {cloneElement, isValidElement, useEffect, useRef, useState} from 'react'
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Link from "next/link";
import {Badge} from "@/components/ui/badge";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import {DrawerClose, DrawerDescription, DrawerHeader, DrawerTitle} from "@/components/ui/drawer";
import {menu} from "../../../data/menu";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import Menu from "@/components/custom/Menu";
import UploadProfileImage from "@/components/custom/UploadProfileImage";
import Image from "next/image";

const MainMenu = () => {
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
        toast.success("Logout successful")
        router.push('/login')
    }

    return (
        <div>
            <div className="justify-center items-center flex flex-col">
                <div className="space-y-1 flex gap-5 justify-center items-center">
                    {token && (
                        <Avatar className={'w-16 h-16'}>
                            {user?.profileImage ? (
                                <div className="w-32 aspect-square relative">
                                    <AvatarImage
                                        src={`http://100.81.212.125:8080/${user.profileImage}`}
                                        alt="Profile"
                                        onError={(e) => {
                                            e.currentTarget.src = 'https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-875.jpg?semt=ais_hybrid&w=740'
                                        }}
                                        className="rounded-full object-cover"
                                    />
                                </div>

                            ) : (
                                <Image src="https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-875.jpg?semt=ais_hybrid&w=740" alt="Default Profile" width={128} height={128} />
                            )}
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
                                <Menu content={<UploadProfileImage />} title="Profile Image" description="Upload your profile image">
                                    <Button className="text-white bg-transparent border-none hover:text-amber-500 hover:cursor-pointer active:text-amber-500">
                                        Set Profile Image
                                    </Button>
                                </Menu>
                                <Separator orientation="vertical" />
                                <DrawerClose asChild>
                                    <Button onClick={handleLogout} className="text-white bg-transparent border-none hover:text-amber-500 hover:cursor-pointer active:text-amber-500">
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
        </div>
    )
}
export default MainMenu

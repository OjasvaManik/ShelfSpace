'use client'

import {usePathname, useRouter} from "next/navigation";
import { BreadCrumb } from "@/components/custom/BreadCrumb";
import SearchBar from "@/components/custom/SearchBar";
import Menu from "@/components/custom/Menu";
import {Button} from "@/components/ui/button";
import React, {useEffect} from "react";
import {Search} from "lucide-react";
import MobileSearch from "@/components/custom/MobileSearch";

function isTokenExpired(token: string): boolean {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp * 1000 < Date.now();
    } catch {
        return true;
    }
}

export default function BaseLayoutClient({
                                             children,
                                         }: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const shouldShowSearchBar = pathname !== "/";

    const router = useRouter();

    useEffect(() => {
        // Wait for DOM to be ready
        if (typeof window === 'undefined') return;

        const token = localStorage.getItem('token');
        if (token && isTokenExpired(token)) {
            localStorage.removeItem('token');
            router.push('/login');
        }
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
                return;
            }

            const lastFetched = localStorage.getItem('lastUserFetch');
            const now = Date.now();

            // If last fetch was within 15 minutes (900000ms), skip
            if (lastFetched && now - parseInt(lastFetched) < 15 * 60 * 1000) {
                console.log('Skipping user fetch, fetched recently.');
                return;
            }

            try {
                const res = await fetch('http://100.81.212.125:8080/api/v1/auth/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) throw new Error('Unauthorized');

                const { data } = await res.json();
                localStorage.setItem('user', JSON.stringify(data));
                localStorage.setItem('lastUserFetch', now.toString());
                console.log('User data refreshed');
            } catch (err) {
                console.error(err);
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                localStorage.removeItem('lastUserFetch');
                router.push('/login');
            }
        };

        fetchUser();
    }, [router]);

    return (
        <>
            <div className="py-4 flex items-center justify-between">
                <div className="text-4xl border-b border-amber-500 w-fit hover:border-white lg:mx-10 lg:my-3 mx-5 my-3 font-[Righteous]">
                    <BreadCrumb />
                </div>
                {shouldShowSearchBar && (
                    <div>
                        <div className="mx-5 hidden lg:block">
                            <SearchBar />
                        </div>
                    </div>
                )}
                <div className={'flex'}>
                    { shouldShowSearchBar && (
                        <Menu content={<MobileSearch />} title={"Search"} description={"Search for guides, components, and more"}>
                            <Button className={'rounded-full bg-transparent w-10 h-10 active:border-amber-500 text-amber-500 lg:hidden border-white border-4'}>
                                <Search size={24} />
                            </Button>
                        </Menu>
                    )}
                    <div className={'bg-transparent rounded-full mx-5'}>
                        <Menu>
                            <Button className={'rounded-full bg-amber-500 w-10 h-10 hover:bg-white active:bg-white hover:text-amber-500 border-4 border-white'}>
                                M
                            </Button>
                        </Menu>
                    </div>
                </div>
            </div>
            {children}
            {/*{shouldShowSearchBar && (*/}
            {/*    // <div className="fixed bottom-0 w-full z-50 bg-transparent flex justify-center p-2">*/}

            {/*    // </div>*/}
            {/*)}*/}
        </>
    );
}

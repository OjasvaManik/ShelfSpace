'use client'

import { usePathname } from "next/navigation";
import { BreadCrumb } from "@/components/custom/BreadCrumb";
import SearchBar from "@/components/custom/SearchBar";
import Menu from "@/components/custom/Menu";
import {Button} from "@/components/ui/button";
import React from "react";

export default function BaseLayoutClient({
                                             children,
                                         }: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const shouldShowSearchBar = pathname !== "/";

    return (
        <>
            <div className="sticky top-0 z-50 py-4">
                <div className="text-4xl border-b border-white/35 w-fit hover:border-white lg:mx-10 lg:my-3 mx-5 my-3 font-[Righteous]">
                    <BreadCrumb />
                </div>
            </div>
            {children}
            {shouldShowSearchBar && (
                <div className="fixed bottom-0 w-full z-50 bg-transparent flex justify-center p-2">
                    <div className={''}>
                        <SearchBar>
                            <Menu>
                                <Button className={'rounded-full bg-amber-500 w-5 h-8 hover:bg-white hover:text-amber-500'}>
                                    M
                                </Button>
                            </Menu>
                        </SearchBar>
                    </div>
                </div>
            )}
        </>
    );
}

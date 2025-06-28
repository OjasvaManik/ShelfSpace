'use client'

import React, { ReactNode } from 'react';
import BreadCrumbComponent from "@/components/custom/misc/BreadCrumbComponent";
import {usePathname} from "next/navigation";

const PageShell = ({ children }: { children: ReactNode }) => {
    const pathname = usePathname()
    return (
        <div className={'w-screen h-[750px] lg:h-screen p-3 lg:p-5 box-border overflow-y-auto scrollbar-hide'}>
            <div className="w-full h-full lg:bg-gradient-to-tr from-purple-950 to-amber-700 bg-gradient-to-bl rounded-3xl overflow-hidden flex justify-center items-center lg:pl-63 overflow-y-auto scrollbar-hide border-y-8 border-white flex-col">


                {/* Show breadcrumb if not home */}
                {pathname !== '/' && (
                    <div className="px-4 py-2 flex items-center justify-center">
                        <BreadCrumbComponent />
                    </div>
                )}
                    {children}
            </div>
        </div>
    );
};

export default PageShell;

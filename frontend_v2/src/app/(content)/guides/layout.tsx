'use client'

import React from 'react'
import GuideNav from "@/components/custom/guides/GuideNav";
import PageShell from "@/components/custom/misc/PageShell";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <PageShell>
            <div className="flex flex-col w-full h-full overflow-y-auto scrollbar-hide">
                <GuideNav />
                {children}
            </div>
        </PageShell>
    )
}

export default RootLayout
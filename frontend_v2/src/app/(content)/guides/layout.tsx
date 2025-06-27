import React from 'react'
import GuideNav from "@/components/custom/guides/GuideNav";
import PageShell from "@/components/custom/misc/PageShell";

const RootLayout = ({
                        children,
                    }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <PageShell>
            <div className={'flex flex-col w-full h-full'}>
                <GuideNav />
                {children}
            </div>
        </PageShell>
    )
}
export default RootLayout

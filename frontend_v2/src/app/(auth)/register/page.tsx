import React from 'react'
import Register from "@/components/custom/auth/Register";
import PageShell from "@/components/custom/misc/PageShell";
import Link from "next/link";

const Page = () => {
    return (
        <PageShell>
            <div className={'w-full'}>
                <Register />
                <div className={'m-4 mt-0 text-white/75'}>
                    <p className={'text-center'}>
                        Already have an account? <span className={'text-white hover:text-gray-700'}><Link href={'/login'}>Login</Link></span>
                    </p>
                </div>
            </div>
        </PageShell>
    )
}
export default Page

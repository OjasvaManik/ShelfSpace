import React from 'react'
import PageShell from "@/components/custom/misc/PageShell";
import Login from "@/components/custom/auth/Login";
import Link from "next/link";

const Page = () => {
    return (
        <PageShell>
            <div className={'w-full flex flex-col justify-center items-center'}>
                <Login />
                <div className={'m-4 mt-0 text-white/75'}>
                    <p className={'text-center'}>
                        Don&#39;t have an account? <span className={'text-white hover:text-gray-700'}><Link href={'/register'}>Register</Link></span>
                    </p>
                </div>
            </div>
        </PageShell>
    )
}
export default Page

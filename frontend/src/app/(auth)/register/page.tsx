import React from 'react'
import Register from "@/components/custom/Register";
import Link from "next/link";

const Page = () => {
    return (
        <div>
            <Register />
            <div>
                <p className={'text-center mt-5'}>
                   Already have an account? <span className={'text-amber-500 hover:text-white'}><Link href={'/login'}>Login</Link></span>
                </p>
            </div>
        </div>
    )
}
export default Page

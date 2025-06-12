import React from 'react'
import Login from "@/components/custom/Login";
import Link from "next/link";

const Page = () => {
    return (
        <div>
            <Login />
            <div>
                <p className={'text-center mt-5'}>
                    Don't have an account? <span className={'text-amber-500 hover:text-white'}><Link href={'/register'}>Register</Link></span>
                </p>
            </div>
        </div>
    )
}
export default Page

'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import axios from 'axios'

type GuideType = {
    id: string
    title: string
    summary: string
    description: string
}

const ViewGuide = () => {
    const params = useParams()
    const id = params?.id as string
    const router = useRouter()

    const [token, setToken] = useState<string | null>(null)
    const [guide, setGuide] = useState<GuideType | null>(null)

    useEffect(() => {
        if (!id || id === 'undefined') {
            toast.error("Invalid guide ID")
            router.push('/guides')
            return
        }

        const storedToken = localStorage.getItem('token')
        const storedUser = localStorage.getItem('user')

        if (!storedToken || !storedUser) {
            toast.error("Please log in to edit the guide.")
            router.push("/login")
            return
        }

        setToken(storedToken)

        const fetchGuide = async () => {
            try {
                const res = await axios.get(`http://100.81.212.125:8080/api/v1/guides/${id}`, {
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                    },
                })

                setGuide(res.data.data)
            } catch (err) {
                toast.error("Failed to load guide.")
            }
        }

        fetchGuide()
    }, [id, router])

    if (!guide) return <p>Loading...</p>

    return (
        <div className={'flex flex-col items-center justify-center p-4 gap-4 h-full w-full'}>
            <div className={'flex justify-center items-center p-4 bg-white w-200 rounded-lg shadow-4xl shadow-black'}>
                <h1>{guide.title}</h1>
            </div>
            <div className={'flex justify-center items-center p-4 bg-white w-200 rounded-lg shadow-4xl shadow-black'}>
                <h2>{guide.summary}</h2>
            </div>
            <div
                dangerouslySetInnerHTML={{ __html: guide.description }}
                className="prose max-w-none p-4 bg-white w-200 rounded-lg shadow-4xl shadow-black h-150 overflow-y-auto scrollbar-hide text-wrap"
            />
        </div>
    )
}

export default ViewGuide

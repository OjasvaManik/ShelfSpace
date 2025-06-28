'use client'

import React, { useEffect, useState, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import axios from 'axios'
import { format } from 'date-fns'
import renderMathInElement from 'katex/contrib/auto-render'
import 'katex/dist/katex.min.css'

type GuideType = {
    id: string
    title: string
    summary: string
    description: string,
    createdAt: string,
    updatedAt: string,
}

const ViewGuide = () => {
    const params = useParams()
    const id = params?.id as string
    const router = useRouter()

    const [token, setToken] = useState<string | null>(null)
    const [guide, setGuide] = useState<GuideType | null>(null)

    const descriptionRef = useRef<HTMLDivElement>(null)

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

    useEffect(() => {
        if (!guide || !descriptionRef.current) return;

        const raf = requestAnimationFrame(() => {
            renderMathInElement(descriptionRef.current!, {
                delimiters: [
                    { left: "$$", right: "$$", display: true },
                    { left: "$", right: "$", display: false }
                ],
                throwOnError: false,
            })
        })

        return () => cancelAnimationFrame(raf)
    }, [guide])

    if (!guide) return <p>Loading...</p>

    return (
        <div className="flex flex-col items-center justify-start px-6 py-8 gap-3 min-h-screen font-[Palanquin]">
            <div className="bg-white rounded-2xl lg:p-6 shadow-xl p-3 w-full max-w-4xl">
                <h1 className="lg:text-5xl text-3xl font-bold text-center text-amber-500">{guide.title}</h1>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full max-w-4xl">
                <div className="bg-white rounded-xl p-4 shadow-md flex flex-col gap-1">
                    <p className="text-sm text-pink-500">Created At</p>
                    <p className="text-md font-medium text-black/45">{format(new Date(guide.createdAt), 'dd-MM-yyyy HH:mm')}</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-md flex flex-col gap-1">
                    <p className="text-sm text-pink-500">Last Updated</p>
                    <p className="text-md font-medium text-black/45">{format(new Date(guide.updatedAt), 'dd-MM-yyyy HH:mm')}</p>
                </div>
            </div>

            <div className="bg-white rounded-xl p-6 w-full max-w-4xl shadow-md">
                <h2 className="text-2xl font-semibold text-center text-gray-500 break-words whitespace-pre-wrap">
                    {guide.summary}
                </h2>
            </div>

            <div
                ref={descriptionRef}
                dangerouslySetInnerHTML={{ __html: guide.description }}
                className="prose lg:max-w-4xl lg:min-w-4xl min-w-[350px] max-w-[350px] bg-white p-6 rounded-xl shadow-md overflow-y-auto min-h-[500px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-hide text-wrap overflow-x-none space-y-4"
            />
        </div>
    )
}

export default ViewGuide

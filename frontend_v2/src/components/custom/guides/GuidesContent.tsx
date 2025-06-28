'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import { format } from 'date-fns'

type Guide = {
    id: string
    title: string
    summary: string,
    createdAt: string,
    updatedAt: string,
}

const GuideContent = () => {
    const [guides, setGuides] = useState<Guide[]>([])

    useEffect(() => {
        const fetchGuides = async () => {
            const token = localStorage.getItem("token")
            if (!token) {
                toast.error("No token found. Please log in.")
                return
            }

            try {
                const res = await axios.get("http://100.81.212.125:8080/api/v1/guides", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setGuides(res.data.data)
            } catch (err: any) {
                toast.error("Failed to fetch guides: " + (err?.response?.data?.message || err.message))
            }
        }

        fetchGuides()
    }, [])

    const handleDeleteGuide = async (id: string) => {
        const token = localStorage.getItem("token")
        if (!token) {
            toast.error("No token found. Please log in.")
            return
        }

        try {
            await axios.delete(`http://100.81.212.125:8080/api/v1/guides/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setGuides(prev => prev.filter(g => g.id !== id))

        } catch (err: any) {
            toast.error("Failed to delete guide: " + (err?.response?.data?.message || err.message))
        }
    }

    return (
        <div className="mx-4 mt-4 mb-4">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10">
                {guides.map((guide) => (
                    <Link key={guide.id} href={`/guides/${guide.id}`} className="cursor-pointer">
                        <Card className="bg-transparent border-white border-4 border-r-0 shadow-black shadow-xl lg:shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105 active:scale-105">
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <CardTitle className="text-amber-500 hover:underline text-xl">{guide.title}</CardTitle>
                                    <Button
                                        variant="destructive"
                                        className="bg-transparent hover:bg-red-500 hover:text-white active:bg-red-600"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            e.preventDefault()
                                            handleDeleteGuide(guide.id)
                                        }}
                                    >
                                        <Trash />
                                    </Button>
                                </div>
                                <div className="grid lg:grid-cols-1 grid-cols-2 lg:gap-4 w-full gap-2">
                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm text-pink-500">Created At</p>
                                        <p className="text-md font-medium text-white">{format(new Date(guide.createdAt), 'dd-MM-yyyy HH:mm')}</p>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm text-pink-500">Last Updated</p>
                                        <p className="text-md font-medium text-white">{format(new Date(guide.updatedAt), 'dd-MM-yyyy HH:mm')}</p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-white/90 text-sm">{guide.summary}</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default GuideContent

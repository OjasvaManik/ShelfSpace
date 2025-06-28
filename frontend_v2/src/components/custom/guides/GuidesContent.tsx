'use client'

import React, { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import { format } from 'date-fns'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Guide = {
    id: string
    title: string
    summary: string
    description: string
    createdAt: string
    updatedAt: string
}

const GuideContent = () => {
    const [guides, setGuides] = useState<Guide[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [sortBy, setSortBy] = useState<'title' | 'createdAt' | 'updatedAt'>('createdAt')
    const [order, setOrder] = useState<'asc' | 'desc'>('desc')

    const fetchGuides = useCallback(async () => {
        setLoading(true)
        setError(null)

        const token = localStorage.getItem("token")
        if (!token) {
            setError("No token found. Please log in.")
            setLoading(false)
            return
        }

        try {
            console.log(`Fetching with sort: ${sortBy}, order: ${order}`)
            const res = await axios.get("http://100.81.212.125:8080/api/v1/guides", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    sortBy,
                    order
                }
            })

            console.log("Received guides:", res.data.data)
            setGuides(res.data.data)
        } catch (err: any) {
            console.error("Fetch error:", err)
            setError(err?.response?.data?.message || err.message)
            toast.error("Failed to fetch guides")
        } finally {
            setLoading(false)
        }
    }, [sortBy, order])

    useEffect(() => {
        // Add a small delay to prevent rapid requests during quick sorting changes
        const timer = setTimeout(() => {
            fetchGuides()
        }, 200)

        return () => clearTimeout(timer)
    }, [fetchGuides])

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
            toast.success("Guide deleted successfully")
        } catch (err: any) {
            toast.error("Failed to delete guide: " + (err?.response?.data?.message || err.message))
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-white">Loading guides...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-red-500">{error}</div>
            </div>
        )
    }

    return (
        <div className="mx-4 mt-4 mb-4">
            {/* Sorting Controls */}
            <div className="flex gap-6 mb-6 justify-start">
                {/* Sort By */}
                <div className="">
                    <Select
                        value={sortBy}
                        onValueChange={(value) => setSortBy(value as typeof sortBy)}
                    >
                        <SelectTrigger className="bg-transparent hover:bg-white hover:text-black drop-shadow-2xl shadow-black text-white outline-0 border-0">
                            <SelectValue placeholder="Sort By" />
                        </SelectTrigger>
                        <SelectContent className="bg-white text-black drop-shadow-2xl shadow-black outline-0 border-0">
                            <SelectItem value="title">Alphabetical</SelectItem>
                            <SelectItem value="createdAt">Created At</SelectItem>
                            <SelectItem value="updatedAt">Last Modified</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Order */}
                <div className="w-[200px]">
                    <Select
                        value={order}
                        onValueChange={(value) => setOrder(value as typeof order)}
                    >
                        <SelectTrigger className="bg-transparent hover:bg-white hover:text-black drop-shadow-2xl shadow-black text-white outline-0 border-0">
                            <SelectValue placeholder="Order" />
                        </SelectTrigger>
                        <SelectContent className="bg-white text-black drop-shadow-2xl shadow-black outline-0 border-0">
                            <SelectItem value="asc">Ascending</SelectItem>
                            <SelectItem value="desc">Descending</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Guides List */}
            {guides.length === 0 ? (
                <div className="flex justify-center items-center h-64">
                    <div className="text-white">No guides found</div>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10">
                    {guides.map((guide) => (
                        <Link key={guide.id} href={`/guides/${guide.id}`} className="cursor-pointer">
                            <Card className="bg-transparent border-white border-4 border-r-0 shadow-black shadow-xl lg:shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105 active:scale-105">
                                <CardHeader>
                                    <div className="flex justify-between items-center">
                                        <CardTitle className="text-amber-500 hover:underline text-xl">
                                            {guide.title}
                                        </CardTitle>
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
                                            <p className="text-md font-medium text-white">
                                                {format(new Date(guide.createdAt), 'dd-MM-yyyy HH:mm')}
                                            </p>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <p className="text-sm text-pink-500">Last Updated</p>
                                            <p className="text-md font-medium text-white">
                                                {format(new Date(guide.updatedAt), 'dd-MM-yyyy HH:mm')}
                                            </p>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-white/90 text-sm break-words line-clamp-4 max-h-24 overflow-hidden">{guide.summary}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}

export default GuideContent
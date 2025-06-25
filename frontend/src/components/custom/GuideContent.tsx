'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import PaginationControls from "@/components/custom/PaginationControls"
import { toast } from "sonner"
import {Button} from "@/components/ui/button";
import {Trash} from "lucide-react";

const ITEMS_PER_PAGE = 15

type Guide = {
    id: string
    title: string
    summary: string
}

const GuideContent = () => {
    const [guides, setGuides] = useState<Guide[]>([])
    const [currentPage, setCurrentPage] = useState(1)

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

    const totalPages = Math.ceil(guides.length / ITEMS_PER_PAGE)
    const paginatedGuides = guides.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    )

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

            // Locally remove the deleted guide
            setGuides(prev => prev.filter(g => g.id !== id))

        } catch (err: any) {
            toast.error("Failed to delete guide: " + (err?.response?.data?.message || err.message))
        }
    }


    return (
        <div className="mx-4 mt-4 mb-4">
            <div className="flex justify-center mb-4">
                <PaginationControls
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10 flex">
                {paginatedGuides.map((guide) => (
                    <Link key={guide.id} href={`/guides/${guide.id}`} className="cursor-pointer">
                        <Card className="bg-black border-amber-500 border-4 border-y-0 shadow-black shadow-xl lg:shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105 active:scale-105">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <CardTitle className="text-amber-500 hover:underline">{guide.title}</CardTitle>
                                    <Button
                                        variant="destructive"
                                        className="bg-transparent text-white hover:bg-red-500 hover:text-white active:bg-red-600"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            e.preventDefault()
                                            handleDeleteGuide(guide.id)
                                        }}
                                    >
                                        <Trash />
                                    </Button>
                                </div>
                            </CardHeader>
                            <Separator className="bg-white" />
                            <CardContent>
                                <p className="text-white/75 text-sm">{guide.summary}</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            <div className="mt-8 flex justify-center">
                <PaginationControls
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    )
}

export default GuideContent

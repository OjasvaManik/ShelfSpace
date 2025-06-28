'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'sonner'
import { z } from 'zod'
import { useParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Tiptap from '@/components/custom/tiptap/Tiptap'

const updateGuideSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    summary: z.string().min(5, 'Summary must be at least 5 characters').max(200, 'Summary must not exceed 200 characters'),
    description: z.string().min(1, 'Description cannot be empty'),
})

type UpdateGuideType = z.infer<typeof updateGuideSchema>

const GuideEdit = () => {
    const params = useParams()
    const id = params?.id as string
    const router = useRouter()
    const [token, setToken] = useState<string | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const [description, setDescription] = useState('')

    const form = useForm<UpdateGuideType>({
        resolver: zodResolver(updateGuideSchema),
        defaultValues: {
            title: '',
            summary: '',
            description: '',
        },
    })

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

                const guide = res.data.data
                form.setValue('title', guide.title)
                form.setValue('summary', guide.summary)
                form.setValue('description', guide.description)
                setDescription(guide.description)
                setIsLoaded(true)
            } catch (err) {
                toast.error("Failed to load guide.")
            }
        }

        fetchGuide()
    }, [id, router, form])

    const onSubmit = async (data: UpdateGuideType) => {
        if (!token) return

        try {
            setIsUploading(true)

            const payload = {
                ...data,
                description,
            }

            await axios.put(`http://100.81.212.125:8080/api/v1/guides/update/${id}`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            toast.success('Guide updated successfully!')
            router.push('/guides')
        } catch (err: any) {
            toast.error(err?.response?.data?.message || 'Something went wrong')
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <div className="flex flex-col items-center justify-start px-6 py-8 gap-3 min-h-screen font-[Palanquin]">
            {token ? (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-4xl">
                        {/* Title */}
                        <div className="w-full">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                placeholder="Title"
                                                className="bg-white rounded-xl lg:p-10 shadow-xl p-5 outline-0 border-none text-2xl lg:text-5xl text-center text-amber-500 font-bold"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Summary */}
                        <div className="w-full">
                            <FormField
                                control={form.control}
                                name="summary"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <textarea
                                                placeholder="Summary"
                                                className="outline-0 bg-white rounded-xl p-6 shadow-md resize-none w-full text-xl text-center text-gray-500 placeholder:text-gray-400"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Description */}
                        <div className="bg-white rounded-xl p-3 shadow-md w-full min-h-[500px]">
                            <FormField
                                control={form.control}
                                name="description"
                                render={() => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="select-text">
                                                {isLoaded && (
                                                    <Tiptap
                                                        content={description}
                                                        setDescription={(value: string) => {
                                                            setDescription(value)
                                                            form.setValue('description', value)
                                                            form.trigger('description')
                                                        }}
                                                    />
                                                )}
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Button */}
                        <div className="w-full flex justify-center">
                            <Button
                                type="submit"
                                disabled={isUploading}
                                className="bg-white text-black rounded-xl shadow-md px-6 py-2 w-full hover:bg-black hover:text-white"
                            >
                                {isUploading ? 'Updating...' : 'Update Guide'}
                            </Button>
                        </div>
                    </form>
                </Form>
            ) : (
                <p className="text-red-500 text-center">Please log in to edit the guide.</p>
            )}
        </div>
    )
}

export default GuideEdit

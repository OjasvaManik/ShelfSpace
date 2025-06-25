'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'sonner'
import { z } from 'zod'
import {useParams, useRouter} from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Tiptap from '@/components/custom/Tiptap'

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

    const form = useForm<UpdateGuideType>({
        resolver: zodResolver(updateGuideSchema),
        defaultValues: {
            title: '',
            summary: '',
            description: '',
        },
    })

    // Fetch guide + token on mount
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
            router.push("/login") // or any auth page
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

            await axios.put(`http://100.81.212.125:8080/api/v1/guides/update/${id}`, data, {
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
        <div className="w-full px-4 mt-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder="Title"
                                        className="outline-0 border-x-4 border-amber-500 border-y-0 focus-visible:border-white focus-visible:ring-0 selection:bg-[#FFC107] selection:text-white font-[Palanquin]"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="summary"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <textarea
                                        placeholder="Summary"
                                        className="outline-0 border-x-4 border-amber-500 border-y-0 focus-visible:border-white focus-visible:ring-0 selection:bg-[#FFC107] selection:text-white font-[Palanquin] w-full p-2.5 rounded-md text-sm"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="select-text">
                                        {isLoaded && (
                                            <Tiptap
                                                content={field.value}
                                                setDescription={(value: string) => {
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


                    <Button type="submit" disabled={isUploading} className={'bg-amber-500'}>
                        {isUploading ? 'Updating...' : 'Update Guide'}
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default GuideEdit

'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
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
import axios from 'axios'
import { toast } from 'sonner'
import Tiptap from '@/components/custom/tiptap/Tiptap'

const addGuideSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    summary: z.string().min(5, 'Summary must be at least 5 characters').max(200, 'Summary must not exceed 200 characters'),
    description: z.string(),
})

type AddGuideType = z.infer<typeof addGuideSchema>

const CreateGuide = () => {
    const [user, setUser] = useState<any>(null)
    const [token, setToken] = useState<string | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [description, setDescription] = useState('')

    const router = useRouter()

    const form = useForm<AddGuideType>({
        resolver: zodResolver(addGuideSchema),
        defaultValues: {
            title: '',
            summary: '',
            description: '',
        },
    })

    useEffect(() => {
        const storedToken = localStorage.getItem('token')
        const storedUser = localStorage.getItem('user')

        if (storedToken && storedUser) {
            setToken(storedToken)
            setUser(JSON.parse(storedUser))
        }
    }, [])

    const onSubmit = async (data: AddGuideType) => {
        try {
            setIsUploading(true)

            const payload = {
                ...data,
                description,
                createdBy: user?.id,
            }

            await axios.post('http://100.81.212.125:8080/api/v1/guides/create', payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            toast.success('Guide created successfully!')
            router.refresh()
            router.push('/guides')
        } catch (err: any) {
            toast.error(err?.response?.data?.message || 'Something went wrong')
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <div className="flex flex-col items-center justify-start px-6 py-8 gap-3 min-h-screen">
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
                                                <Tiptap
                                                    setDescription={(value: string) => {
                                                        setDescription(value)
                                                        form.setValue('description', value)
                                                        form.trigger('description')
                                                    }}
                                                />
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
                                {isUploading ? 'Submitting...' : 'Create'}
                            </Button>
                        </div>
                    </form>
                </Form>
            ) : (
                <p className="text-red-500 text-center">Please log in to add a guide.</p>
            )}
        </div>
    )
}

export default CreateGuide

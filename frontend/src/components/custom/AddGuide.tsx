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
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { toast } from 'sonner'
import Tiptap from '@/components/custom/Tiptap'

const addGuideSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    summary: z.string().min(5, 'Summary must be at least 5 characters').max(200, 'Summary must not exceed 200 characters'),
    description: z.string(),
})

type AddGuideType = z.infer<typeof addGuideSchema>

const AddGuide = () => {
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
            console.log("form data:", data)
            console.log("description:", description)

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
        <div className="w-full px-4">
            {token ? (
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
                            render={() => (
                                <FormItem>
                                    {/*<FormLabel className={'text-amber-500 '}>Description</FormLabel>*/}
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

                        <Button type="submit" disabled={isUploading} className={'bg-amber-500'}>
                            {isUploading ? 'Submitting...' : 'Create Guide'}
                        </Button>
                    </form>
                </Form>
            ) : (
                <p className="text-red-500 text-center">Please log in to add a guide.</p>
            )}
        </div>
    )
}

export default AddGuide

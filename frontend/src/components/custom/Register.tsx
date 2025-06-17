'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import axios from "axios";
import {useRouter} from "next/navigation";
import {toast} from "sonner";

// Zod Schema
const formSchema = z.object({
    userName: z.string().min(2, 'Username must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    userPassword: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string()
}).refine((data) => data.userPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
})

type RegisterFormValues = z.infer<typeof formSchema>

const Register = () => {
    const router = useRouter()
    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            userName: '',
            email: '',
            userPassword: '',
            confirmPassword: '',
        },
    })

    const onSubmit = async (data: RegisterFormValues) => {
        if (data.userPassword != data.confirmPassword) {
            form.setError('confirmPassword', {
                type: 'manual',
                message: "Passwords don't match",
            })
            return
        }
        try {
            await axios.post('http://100.81.212.125:8080/api/v1/auth/register', {
                userName: data.userName,
                email: data.email,
                userPassword: data.userPassword,
            })
            // console.log(data)
        } catch (error: any) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error('Backend Error:', error.response.data.message)
            } else {
                toast.error('Unexpected Error:', error)
            }
        }
        toast.success('Registration successful! Please log in.')
        router.push('/login')
    }

    return (
        <Form {...form} >
            <div className={'flex justify-center items-center w-screen p-4'}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 border-y-8 border-amber-500 rounded-2xl p-10 lg:min-w-lg">
                    <FormField
                        control={form.control}
                        name="userName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="your_username" {...field} className={'outline-0 border-x-4 border-amber-500 border-y-0 focus-visible:border-white focus-visible:ring-0'} />
                                </FormControl>
                                <FormDescription>This is your public display name. Needs to be unique.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="you@example.com" {...field} className={'outline-0 border-x-4 border-amber-500 border-y-0 focus-visible:border-white focus-visible:ring-0'} />
                                </FormControl>
                                <FormDescription>Email will be required for OTP verification.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="userPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" {...field} className={'outline-0 border-x-4 border-amber-500 border-y-0 focus-visible:border-white focus-visible:ring-0'} />
                                </FormControl>
                                <FormDescription>At least 6 characters long. Use a strong password.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input type="password" {...field} className={'outline-0 border-x-4 border-amber-500 border-y-0 focus-visible:border-white focus-visible:ring-0'} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="w-full bg-amber-500 hover:bg-white hover:text-amber-500"
                        disabled={form.formState.isSubmitting}
                    >
                        {form.formState.isSubmitting ? 'Registering...' : 'Register'}
                    </Button>

                </form>
            </div>
        </Form>
    )
}

export default Register

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
import {useRouter} from "next/navigation";
import axios from "axios";
import {toast} from "sonner";

// Zod Schema for login
const loginSchema = z.object({
    userName: z.string().min(2, 'Username must be at least 2 characters'),
    userPassword: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormValues = z.infer<typeof loginSchema>

const Login = () => {
    const router = useRouter()
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            userName: '',
            userPassword: '',
        },
    })

    const onSubmit = async (data: LoginFormValues) => {
        try {
            const response = await axios.post('http://100.81.212.125:8080/api/v1/auth/login', data)
            const userData = response.data.data

            // Store user data and token in localStorage
            localStorage.setItem('user', JSON.stringify(userData))
            localStorage.setItem('token', userData.token)

            console.log(userData)
            toast.success('Logged in successfully!')

            router.push('/')
        } catch (error: any) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(`${error.response.data.message}`)
            } else {
                toast.error('Something went wrong. Try again.')
            }
        }
    }



    return (
        <Form {...form}>
            <div className="flex justify-center items-center w-screen p-4">
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 border-y-8 border-amber-500 rounded-2xl p-10 lg:min-w-lg min-w-sm">
                    <FormField
                        control={form.control}
                        name="userName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="your_username" {...field} className="outline-0 border-x-4 border-amber-500 border-y-0 focus-visible:border-white focus-visible:ring-0" />
                                </FormControl>
                                <FormDescription>Enter your registered username.</FormDescription>
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
                                    <Input type="password" {...field} className="outline-0 border-x-4 border-amber-500 border-y-0 focus-visible:border-white focus-visible:ring-0" />
                                </FormControl>
                                <FormDescription>Enter your account password.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="w-full bg-amber-500 hover:bg-white hover:text-amber-500"
                        disabled={form.formState.isSubmitting}
                    >
                        {form.formState.isSubmitting ? 'Logging In...' : 'Login'}
                    </Button>

                </form>
            </div>
        </Form>
    )
}

export default Login

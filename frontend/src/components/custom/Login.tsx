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

// Zod Schema for login
const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormValues = z.infer<typeof loginSchema>

const Login = () => {
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const onSubmit = (data: LoginFormValues) => {
        console.log('Logging in:', data)
    }

    return (
        <Form {...form}>
            <div className="flex justify-center items-center w-screen p-4">
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 border-y-8 border-amber-500 rounded-2xl p-10 lg:min-w-lg min-w-sm">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="you@example.com" {...field} className="outline-0 border-x-4 border-amber-500 border-y-0 focus-visible:border-white focus-visible:ring-0" />
                                </FormControl>
                                <FormDescription>Enter your registered email.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
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

                    <Button type="submit" className="w-full bg-amber-500 hover:bg-white hover:text-amber-500">
                        Login
                    </Button>
                </form>
            </div>
        </Form>
    )
}

export default Login

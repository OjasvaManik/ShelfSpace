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

// Zod Schema
const formSchema = z.object({
    username: z.string().min(2, 'Username must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
})

type RegisterFormValues = z.infer<typeof formSchema>

const Register = () => {
    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    })

    const onSubmit = (data: RegisterFormValues) => {
        console.log('Registering:', data)
    }

    return (
        <Form {...form} >
            <div className={'flex justify-center items-center w-screen p-4'}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 border-y-8 border-amber-500 rounded-2xl p-10 lg:min-w-lg">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="your_username" {...field} className={'outline-0 border-x-4 border-amber-500 border-y-0 focus-visible:border-white focus-visible:ring-0'} />
                                </FormControl>
                                <FormDescription>This is your public display name.</FormDescription>
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
                        name="password"
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

                    <Button type="submit" className="w-full bg-amber-500 hover:bg-white hover:text-amber-500">
                        Register
                    </Button>
                </form>
            </div>
        </Form>
    )
}

export default Register

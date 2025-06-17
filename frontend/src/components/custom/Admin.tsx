'use client'

import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import SearchUsers from "@/components/custom/SearchUsers"
import AdminTable from "@/components/custom/AdminTable"

type User = {
    id: string
    email: string
    role: string
    status: string
}

const Admin = () => {
    const [tab, setTab] = useState<'users' | 'whitelist' | 'blacklist'>('users')
    const [tableData, setTableData] = useState<User[]>([])
    const [token, setToken] = useState<string | null>(null)
    const [user, setUser] = useState<any>(null)

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.href = '/login'
    }

    useEffect(() => {
        const storedToken = localStorage.getItem('token')
        const storedUser = localStorage.getItem('user')

        if (storedToken) setToken(storedToken)
        if (storedUser) setUser(JSON.parse(storedUser))
    }, [])

    useEffect(() => {
        if (!token) return

        const fetchData = async () => {
            console.log('=== TOKEN DEBUG ===')
            console.log('Token:', token)
            console.log('User:', user)

            try {
                const res = await fetch('http://100.81.212.125:8080/api/v1/admin/users', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)

                const data = await res.json()
                setTableData(data.data)
            } catch (error) {
                console.error('Error fetching users:', error)
            }

            try {
                const payload = JSON.parse(atob(token.split('.')[1]))
                console.log('Token payload:', payload)
                console.log('Token expires:', new Date(payload.exp * 1000))
                console.log('Token issued:', new Date(payload.iat * 1000))
            } catch (e) {
                console.error('Invalid token format:', e)
            }
        }

        fetchData()
    }, [token])

    return (
        <div className="flex w-full max-w-5xl flex-col gap-6">
            <Tabs value={tab} onValueChange={(val) => setTab(val as typeof tab)}>
                <TabsList className='bg-transparent border-x-4 border-amber-500 px-4'>
                    <TabsTrigger value="users" className='data-[state=active]:text-amber-500 data-[state=active]:bg-transparent data-[state=active]:border-x-0 data-[state=active]:border-white data-[state=active]:border-t-0 data-[state=active]:border-b-4 text-white'>Users</TabsTrigger>
                    <TabsTrigger value="whitelist" className='data-[state=active]:text-amber-500 data-[state=active]:bg-transparent data-[state=active]:border-x-0 data-[state=active]:border-white data-[state=active]:border-t-0 data-[state=active]:border-b-4 text-white'>Whitelist</TabsTrigger>
                    <TabsTrigger value="blacklist" className='data-[state=active]:text-amber-500 data-[state=active]:bg-transparent data-[state=active]:border-x-0 data-[state=active]:border-white data-[state=active]:border-t-0 data-[state=active]:border-b-4 text-white'>Blacklist</TabsTrigger>
                </TabsList>

                <TabsContent value="users">
                    <Card className='border-y-8 border-amber-500 bg-transparent border-x-0 text-white'>
                        <CardHeader>
                            <CardTitle>USERS</CardTitle>
                            <CardDescription>List of all registered users. You can manage their roles and access here.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <SearchUsers />
                        </CardContent>
                        <CardContent>
                            <AdminTable data={tableData} mode="users" />
                        </CardContent>
                        <CardFooter>
                            <Button>Save changes</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="whitelist">
                    <Card className='border-y-8 border-amber-500 bg-transparent border-x-0 text-white'>
                        <CardHeader>
                            <CardTitle>WHITELIST</CardTitle>
                            <CardDescription>All users you’ve added to the whitelist.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <SearchUsers />
                        </CardContent>
                        <CardContent>
                            <AdminTable data={tableData} mode="whitelist" />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="blacklist">
                    <Card className='border-y-8 border-amber-500 bg-transparent border-x-0 text-white'>
                        <CardHeader>
                            <CardTitle>BLACKLIST</CardTitle>
                            <CardDescription>All users currently blacklisted.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <SearchUsers />
                        </CardContent>
                        <CardContent>
                            <AdminTable data={tableData} mode="blacklist" />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
            <Button onClick={logout}>Logout & Clear Token</Button>
        </div>
    )
}

export default Admin

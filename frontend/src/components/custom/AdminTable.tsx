'use client'

import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import axios from "axios";

type User = {
    id: number
    userName: string
    role: string
    email: string
    isWhitelisted: boolean
    isBanned: boolean
}

type Props = {
    data: User[]
    mode: 'users' | 'whitelist' | 'blacklist'
}

const AdminTable = ({ data, mode }: Props) => {
    const showActions = mode === 'users'

    const handleAction = async (userId: number, action: string) => {
        try {
            await axios.post(`/admin/${action}`, { userId })
            alert(`Action ${action} successful`)
        } catch (err) {
            console.error(err)
            alert(`Action ${action} failed`)
        }
    }

    const getAdminButton = (user: User) => {
        if (user.role === 'ROLE_ADMIN') {
            return (
                <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleAction(user.id, 'remove-admin')}
                    className={'hover:cursor-pointer hover:bg-white bg-amber-500 hover:text-amber-500'}
                >
                    Remove Admin
                </Button>
            )
        }
        return (
            <Button
                size="sm"
                onClick={() => handleAction(user.id, 'admin')}
                className={'hover:cursor-pointer hover:bg-white bg-amber-500 hover:text-amber-500'}
            >
                Make Admin
            </Button>
        )
    }

    const getWhitelistButton = (user: User) => {
        if (user.isWhitelisted) {
            return (
                <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleAction(user.id, 'remove-whitelist')}
                    className={'hover:cursor-pointer hover:bg-white bg-amber-500 hover:text-amber-500'}
                >
                    Remove Whitelist
                </Button>
            )
        }
        return (
            <Button
                size="sm"
                onClick={() => handleAction(user.id, 'whitelist')}
                className={'hover:cursor-pointer hover:bg-white bg-amber-500 hover:text-amber-500'}
            >
                Whitelist
            </Button>
        )
    }

    const getBlacklistButton = (user: User) => {
        if (user.isBanned) {
            return (
                <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleAction(user.id, 'unblacklist')}
                    className={'hover:cursor-pointer hover:bg-white bg-amber-500 hover:text-amber-500'}
                >
                    Unblacklist
                </Button>
            )
        }
        return (
            <Button
                size="sm"
                onClick={() => handleAction(user.id, 'blacklist')}
                className={'hover:cursor-pointer hover:bg-white bg-amber-500 hover:text-amber-500'}
            >
                Blacklist
            </Button>
        )
    }

    return (
        <Table>
            <TableCaption>List of {mode}</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className={'text-amber-500'}>ID</TableHead>
                    <TableHead className={'text-amber-500'}>Username</TableHead>
                    <TableHead className={'text-amber-500'}>Email</TableHead>
                    <TableHead className={'text-amber-500'}>Role</TableHead>
                    <TableHead className={'text-amber-500'}>Whitelisted</TableHead>
                    <TableHead className={'text-amber-500'}>Banned</TableHead>
                    {showActions && <TableHead className="text-right text-amber-500">Actions</TableHead>}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.userName}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role.replace('ROLE_', '')}</TableCell>
                        <TableCell>{user.isWhitelisted ? 'Yes' : 'No'}</TableCell>
                        <TableCell>{user.isBanned ? 'Yes' : 'No'}</TableCell>
                        {showActions && (
                            <TableCell className="text-right space-x-2">
                                {getAdminButton(user)}
                                {getWhitelistButton(user)}
                                {getBlacklistButton(user)}
                            </TableCell>
                        )}
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={showActions ? 7 : 6}>
                        Total users: {data.length}
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}

export default AdminTable

'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'sonner'
import {Button} from "@/components/ui/button";
import Image from "next/image";
import {Input} from "@/components/ui/input";
import { useRouter } from 'next/navigation';

const UploadProfileImage = () => {
    const [user, setUser] = useState<any>(null)
    const [token, setToken] = useState<string | null>(null)
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [isUploading, setIsUploading] = useState(false)

    const router = useRouter();

    useEffect(() => {
        const storedToken = localStorage.getItem('token')
        const storedUser = localStorage.getItem('user')

        if (storedToken && storedUser) {
            setToken(storedToken)
            setUser(JSON.parse(storedUser))
        }
    }, [])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setSelectedImage(file)
            console.log('Selected file:', file.name, file.size, file.type)
        }
    }

    const handleUpload = async () => {
        if (!selectedImage || !user?.id) {
            toast.error('Please select an image and ensure you are logged in.')
            return
        }

        setIsUploading(true)
        const formData = new FormData()
        formData.append('file', selectedImage)
        formData.append('userId', user.id.toString())

        // Debug: Log what we're sending
        console.log('Uploading for user ID:', user.id)
        console.log('FormData entries:')
        for (const [key, value] of formData.entries()) {
            console.log(key, value)
        }

        try {
            const res = await axios.post(
                'http://100.81.212.125:8080/api/v1/users/upload-profile-image',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            console.log('Upload response:', res.data)

            // Update user image locally
            const newProfileImage = res.data.data
            console.log('New profile image path:', newProfileImage)

            const updatedUser = { ...user, profileImage: newProfileImage }
            localStorage.setItem('user', JSON.stringify(updatedUser))
            setUser(updatedUser)

            toast.success('Image uploaded successfully!')
            setSelectedImage(null) // Clear selected file
            router.refresh();
            router.push('/')
        } catch (error) {
            console.error('Upload error:', error)
            if (axios.isAxiosError(error)) {
                console.error('Response data:', error.response?.data)
                console.error('Response status:', error.response?.status)
                toast.error(`Failed to upload image: ${error.response?.data?.message || error.message}`)
            } else {
                toast.error('Failed to upload image.')
            }
        } finally {
            setIsUploading(false)
        }
    }

    // Add some debugging for the image URL
    const getImageUrl = () => {
        if (user?.profileImage && typeof user.profileImage === 'string' && user.profileImage.trim() !== '') {
            const imageUrl = `http://100.81.212.125:8080/${user.profileImage}`
            console.log('Constructed image URL:', imageUrl)
            return imageUrl
        }
        return null
    }

    const imageUrl = getImageUrl()

    return (
        <div>
            {token ? (
                <div className="flex flex-col items-center">
                    {/* Debug info */}
                    {/*<div className="mb-4 p-2 bg-amber-500 rounded text-xs">*/}
                    {/*    <p>User ID: {user?.id}</p>*/}
                    {/*    <p>Profile Image Path: {user?.profileImage || 'None'}</p>*/}
                    {/*    <p>Constructed URL: {imageUrl || 'None'}</p>*/}
                    {/*</div>*/}

                    {user?.profileImage ? (
                        <div className="w-32 aspect-square relative">
                            <Image
                                unoptimized
                                src={`http://100.81.212.125:8080/${user.profileImage}`}
                                alt="Profile"
                                fill
                                onError={(e) => {
                                    e.currentTarget.src = 'https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-875.jpg?semt=ais_hybrid&w=740'
                                }}
                                className="rounded-full object-cover"
                            />
                        </div>

                    ) : (
                        <Image src="https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-875.jpg?semt=ais_hybrid&w=740" alt="Default Profile" width={128} height={128} />
                    )}


                    <Input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-fit border-y-0 border-amber-500 focus-visible:ring-0 outline-0 rounded-md border-x-4 mb-4 file:text-amber-500 file:mr-4"
                    />

                    {selectedImage && (
                        <p className="text-sm text-gray-600 mb-2">
                            Selected: {selectedImage.name}
                        </p>
                    )}

                    <Button
                        onClick={handleUpload}
                        disabled={!selectedImage || isUploading}
                        className="bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-white hover:text-amber-500 border transition border-none disabled:opacity-50"
                    >
                        {isUploading ? 'Uploading...' : 'Upload'}
                    </Button>
                </div>
            ) : (
                <p className="text-gray-500">Please log in to upload a profile image.</p>
            )}
        </div>
    )
}

export default UploadProfileImage
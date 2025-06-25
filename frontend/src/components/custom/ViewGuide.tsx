import React, {useEffect, useState} from 'react'
import {useParams, useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";
import axios from "axios";

const ViewGuide = () => {
    const params = useParams()
    const id = params?.id as string
    const router = useRouter()
    const [token, setToken] = useState<string | null>(null)

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

            } catch (err) {
                toast.error("Failed to load guide.")
            }
        }

        fetchGuide()
    }, [id, router])


    return (
        <div className={''}>
            <div className={''}>

            </div>
        </div>
    )
}
export default ViewGuide

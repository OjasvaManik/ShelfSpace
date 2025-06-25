'use client'

import { useEffect, useState } from 'react'
import { Toaster } from 'sonner'

export const ResponsiveToaster = () => {
    const [position, setPosition] = useState<'top-center' | 'bottom-center'>('top-center')
    const [backgroundColor, setBackgroundColor] = useState('none')

    useEffect(() => {
        const updatePosition = () => {
            if (window.innerWidth < 640) {
                setPosition('bottom-center') // Mobile
            } else {
                setPosition('top-center') // Desktop
            }
        }

        updatePosition()
        window.addEventListener('resize', updatePosition)
        return () => window.removeEventListener('resize', updatePosition)
    }, [])

    return (
        <Toaster
            position={position}
            toastOptions={{
                style: {
                    background: '#000000',
                    color: 'white',
                    border: 'none',
                    borderRadius: '20px',
                    padding: '10px 20px',
                },
            }}
        />
    )
}

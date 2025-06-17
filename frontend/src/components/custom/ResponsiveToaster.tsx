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
                    background: '#212121',
                    color: 'white',
                    borderLeft: '4px solid #FFA100',
                    borderRight: '4px solid #FFA100',
                    borderTop: 'none',
                    borderBottom: 'none',
                    borderRadius: '10px', // pill shape
                    padding: '10px 20px',
                },
            }}
        />
    )
}

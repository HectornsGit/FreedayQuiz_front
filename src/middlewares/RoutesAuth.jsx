'use client'
import { AuthContext } from '@/context/AuthContextProvider'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function routesAuth({ children }) {
    const router = useRouter()
    const { token } = React.useContext(AuthContext)

    React.useEffect(() => {
        if (!token) {
            router.push('/')
        }
    }, [token, router])
    return token ? children : null
}

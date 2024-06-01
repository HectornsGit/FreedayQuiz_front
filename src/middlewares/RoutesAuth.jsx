// 'use client'
// import { useRouter } from 'next/navigation'
// import React from 'react'
// import { useSession } from 'next-auth/react'

// export default function routesAuth({ children }) {
//     const { data: session } = useSession()
//     const router = useRouter()

//     React.useEffect(() => {
//         if (!session) {
//             router.push('/login')
//         }
//     }, [session, router])
//     return session ? children : null
// }
// // status === "authenticated"

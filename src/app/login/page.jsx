'use client'
import { useSession } from 'next-auth/react'
import LoginForm from '../../components/login.form'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const router = useRouter()
    const { data: session } = useSession()
    console.log('session desde login', session)
    return (
        <div className="h-fit flex flex-col justify-center content-center">
            <LoginForm />
            {session && (
                <button
                    style={{ color: 'white' }}
                    onClick={() => router.push('/ruta-restringida')}
                >
                    Ruta restringida
                </button>
            )}
        </div>
    )
}

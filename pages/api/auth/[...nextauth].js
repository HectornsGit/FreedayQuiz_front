import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',

            credentials: {
                email: {
                    label: 'email',
                    type: 'text',
                },
                password: { label: 'password', type: 'password' },
            },
            async authorize(credentials, req) {
                const res = await fetch('http://localhost:3001/login', {
                    method: 'POST',
                    body: JSON.stringify({ credentials }),
                    headers: { 'Content-Type': 'application/json' },
                })
                const user = await res.json()

                if (res.ok && user) {
                    return user
                }

                return null
            },
        }),
    ],
}

export default NextAuth(authOptions)

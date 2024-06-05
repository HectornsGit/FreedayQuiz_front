import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, _req) {
                const { email, password } = credentials
                try {
                    const res = await fetch('http://localhost:3001/login', {
                        method: 'POST',
                        body: JSON.stringify({ email, password }),
                        headers: { 'Content-Type': 'application/json' },
                    })

                    if (!res.ok) {
                        console.error('Failed to authenticate', res.statusText)
                        return null
                    }

                    const user = await res.json()

                    if (user && user.data.token) {
                        return {
                            ...user,
                            token: user.data.token,
                            email: email,
                        }
                    } else {
                        console.error(
                            'User data is missing or token is missing in response'
                        )
                        return null
                    }
                } catch (error) {
                    console.error('Failed to fetch', error)
                    return null
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.token
                token.user = user
            }
            return token
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken
            session.user = token.user
            return session
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

'use client'
import { Montserrat } from 'next/font/google'
import '../styles/globals.css'
import Header from '../components/Header'
import Footer from '@/components/Footer'
const inter = Montserrat({ subsets: ['latin'] })
import ToastProvider from '@/middlewares/ToastProvider'
import { SessionProvider } from 'next-auth/react'

export default function RootLayout({ children, session }) {
    return (
        <html lang="es">
            <head>
                <title>Freeday Quiz</title>
                <meta
                    name="description"
                    content="Trivial de preguntas para Hack a Boss"
                />
            </head>
            <body className={`${inter.className} `}>
                <SessionProvider session={session}>
                    <Header />
                    <main className="w-full min-h-[76vh]">
                        <ToastProvider>{children}</ToastProvider>
                    </main>
                    <Footer />
                </SessionProvider>
            </body>
        </html>
    )
}

'use client'
import { Montserrat } from 'next/font/google'
import '../styles/globals.css'
import Header from '../components/Header'
import Footer from '@/components/Footer'
const inter = Montserrat({ subsets: ['latin'] })
import ToastProvider from '@/middlewares/ToastProvider'
import { SessionProvider } from 'next-auth/react'

// export const metadata = {
//     title: 'Freeday Quiz',
//     description: 'trivial de preguntas para Hack a Boss',
// }

export default function RootLayout({ children, session }) {
    return (
        <html lang="es">
            <body className={`${inter.className}`}>
                <SessionProvider session={session}>
                    <Header />
                    <ToastProvider>
                        <div className='h-lvh flex flex-col items-center justify-center'>
                        {children}
                        </div>
                    </ToastProvider>
                    <Footer />
                </SessionProvider>
            </body>
        </html>
    )
}

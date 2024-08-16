'use client'
import { Montserrat } from 'next/font/google'
import '../styles/globals.css'
import Header from '../components/Header'
import Footer from '@/components/Footer'
const inter = Montserrat({ subsets: ['latin'] })
import { SessionProvider } from 'next-auth/react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useMemo } from 'react'
import { usePathname } from 'next/navigation'

export default function RootLayout({ children, session }) {
    const pathname = usePathname();
    const DontShowHeader = !pathname.startsWith('/QR/');
    const toastConfig = useMemo(
        () => ({
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: false,
            newestOnTop: false,
            closeOnClick: true,
            rtl: false,
            pauseOnFocusLoss: true,
            draggable: true,
            pauseOnHover: true,
            theme: 'light',
        }),
        []
    )

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
                    {DontShowHeader && <Header />}
                    <main className="w-full min-h-[76vh]">
                        <ToastContainer {...toastConfig} />
                        {children}
                    </main>
                    <Footer />
                </SessionProvider>
            </body>
        </html>
    );
}

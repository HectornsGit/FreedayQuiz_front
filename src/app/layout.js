import { Montserrat } from 'next/font/google'
import '../styles/globals.css'
import Header from '../components/Header'
import Footer from '@/components/Footer'
import { AuthContextProvider } from '@/context/AuthContextProvider'

const inter = Montserrat({ subsets: ['latin'] })

export const metadata = {
    title: 'Freeday Quiz',
    description: 'trivial de preguntas para Hack a Boss',
}

export default function RootLayout({ children }) {
    return (
        <AuthContextProvider>
        <html lang="es">
            <body className={`${inter.className}`}>
                <Header />
                {children}
                <Footer/>
            </body>
        </html>
        </AuthContextProvider>
    )
}

import { Montserrat } from 'next/font/google'
import '../styles/globals.css'
import Header from '../components/Header'
import Footer from '@/components/Footer'

const inter = Montserrat({ subsets: ['latin'] })

export const metadata = {
    title: 'Freeday Quiz',
    description: 'trivial de preguntas para Hack a Boss',
}

export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <body className={`${inter.className}`}>
                <Header />
                {children}
                <Footer/>
            </body>
        </html>
    )
}

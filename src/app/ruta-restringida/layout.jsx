'use client'
import RoutesAuth from '@/middlewares/RoutesAuth'

export default function rutaRestringidaLayout({ children }) {
    return (
        <RoutesAuth>
            <div>{children}</div>
        </RoutesAuth>
    )
}

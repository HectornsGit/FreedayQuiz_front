import RoutesAuth from '@/middlewares/RoutesAuth'

export default function PruebaLayout({ children }) {
    return (
        <>
            <RoutesAuth>{children}</RoutesAuth>
        </>
    )
}

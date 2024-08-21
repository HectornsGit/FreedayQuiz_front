'use client';
import RoutesAuth from '@/middlewares/RoutesAuth';

export default function profileLayout({ children }) {
    return (
        <RoutesAuth>
            <div>{children}</div>
        </RoutesAuth>
    );
}

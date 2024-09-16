'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useSession } from 'next-auth/react';

export default function RoutesAuth({ children }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    React.useEffect(() => {
        if (status === 'loading') return;
        if (!session) {
            router.push('/login');
        }
    }, [session, status, router]);

    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    return session ? children : null;
}

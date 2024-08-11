'use client';

import React, { useState } from 'react';
import '../styles/globals.css';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { fetchAPI } from '@/api/fetch-api';

const Landing = () => {
    const [accessCode, setAccessCode] = useState('');
    const router = useRouter();

    const handleSubmit = async () => {
        if (accessCode) {
            const onSuccess = (result) => {
                const { quizId } = result;
                if (quizId) {
                    toast.success('Redirigiendo al juego...');
                    router.push(`/match/${quizId}`);
                } else {
                    toast.error(
                        'No se encontró el quiz con el código proporcionado.'
                    );
                }
            };

            const onError = (error) => {
                console.log('el error', error);
                
                if (error.message === 'Access code is invalid') {
                    toast.error('Código de acceso inválido.');
                } else {
                    toast.error(
                        'Error en el servidor. Por favor, inténtelo de nuevo más tarde.'
                    );
                }
            };

            await fetchAPI(
                `/join-quiz/${accessCode}`,
                'GET',
                null,
                onSuccess,
                onError
            );
        } else {
            toast.error('Por favor, introduce un código de acceso válido');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="text-center text-white">
                <h1 className="text-4xl font-bold mb-4">¡Bienvenido/a!</h1>
                <p className="mb-6">
                    Introduce el pin de juego para empezar a jugar
                </p>
                <div className="flex flex-col items-center">
                    <input
                        type="text"
                        placeholder="Pin de juego"
                        className="mb-4 p-2 text-black rounded"
                        value={accessCode}
                        onChange={(e) => setAccessCode(e.target.value)}
                    />
                    <button
                        className="text-black font-extrabold text-lg bg-gradient px-11 py-2 hover:bg-black hover:box-shadow-yellow"
                        onClick={handleSubmit}
                    >
                        Ingresar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Landing;

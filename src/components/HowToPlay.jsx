'use client';
import { useState } from 'react';
import HowToPlayManager from './HowToPlayManager';

export default function HowToPlay() {
    //Voy a crear dos pestañas (Manager y jugador)
    const [tab, setTab] = useState(1); // creo un estado para saber qué pestaña está activa. Comienza con la 1

    return (
        <section className="w-full max-w-md mx-auto mt-10 flex flex-col items-center">
            <nav className="flex border-b border-[--yellow] mb-4">
                {/* Pestaña 1: Manager */}
                <button
                    className={`py-2 px-4 text-center ${
                        tab === 1
                            ? 'border-b-2 border-[--yellow] text-[--yellow] font-bold'
                            : 'text-white'
                    }`}
                    onClick={() =>
                        setTab(1)
                    } /* creo que como es tan sencillo, no necesitamos un handle */
                >
                    MANAGER
                </button>

                {/* Pestaña 2: Jugador/a */}
                <button
                    className={`py-2 px-4 text-center ${
                        tab === 2
                            ? 'border-b-2 border-[--yellow] text-[--yellow] font-bold'
                            : 'text-white'
                    }`}
                    onClick={() => setTab(2)}
                >
                    JUGADOR/A
                </button>
            </nav>

            {/* CONTENIDO  */}
            <>
                {tab === 1 && <HowToPlayManager />}
                {/* Si el num de pestaña es X imrpime esto */}
                {tab === 2 && (
                    <div>Instrucciones para jugar: en construcción</div>
                )}
            </>
        </section>
    );
}

'use client';
import { useState } from 'react';
import ChevronLeft from './icons/ChevronLeft';
import ChevronRight from './icons/ChevronRight';

export default function HowToPlayPlayer() {
    //TO DO: como voy a usar este slider 2 veces, meterlo en un hook
    //Quería dividir las intrucciones por pasos (steps) para no poner un churro de texto que la gente después le da pereza leer
    const [step, setStep] = useState(1); //El otro slider lo hice regulinchis con JS vainila, vamos a probar con estados

    const handlePrevStep = () => {
        setStep((prevStep) => prevStep - 1);
    };

    const handleNextStep = () => {
        setStep((prevStep) => prevStep + 1);
    };

    return (
        <article className="flex flex-row">
            <button onClick={handlePrevStep}>
                <div
                    className={`bg-[#FCFF00] rounded-full p-2 ${
                        step < 2 ? 'hidden' : 'block'
                    }`}
                >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                </div>
            </button>
            {/* PASO 1: Empezar quiz*/}
            {step === 1 && (
                <section className="flex flex-col px-7 lg:w-max w-fit gap-y-6">
                    <header className="flex items-center gap-x-2">
                        <p className="font-black text-black text-lg text-center bg-[--yellow] p-2 w-8">
                            1
                        </p>
                        <h2 className="font-black text-lg">
                            Cómo empezar a jugar
                        </h2>
                    </header>
                    <div className="max-w-[630px]">
                        <p className="mb-3">
                            Entra a la página web{' '}
                            {`${process.env.NEXT_PUBLIC_FRONT}`}, escribe el pin
                            de juego que ha compartido el mánager y pulsa
                            ingresar
                        </p>
                        <p className="mb-3">
                            También podrás entrar al quiz escaneando el código
                            QR
                        </p>
                    </div>
                    <img
                        src="/instrucciones/Comenzar-Partida-Jugador.gif"
                        alt="video de como registrar un usuario"
                        className="pb-2 pr-2 bg-gradient-to-bl from-[--cyan] to-[--yellow]"
                    />
                </section>
            )}
            {/* PASO 2: Poner nombre*/}
            {step === 2 && (
                <section className="flex flex-col px-7 lg:w-max w-fit gap-y-6">
                    <header className="flex items-center gap-x-2">
                        <p className="font-black text-black text-lg text-center bg-[--yellow] p-2 w-8">
                            2
                        </p>
                        <h2 className="font-black text-lg">
                            Escribe tu nombre
                        </h2>
                    </header>
                    <div className="max-w-[630px]">
                        <p className="mb-3">
                            Escribe tu nombre y pulsa el botón enviar
                        </p>
                        <p className="mb-3">
                            Tu nombre aparecerá en el listado de puntuaciones
                        </p>
                    </div>
                    <img
                        src="/instrucciones/Escribir-Nombre-Jugador.gif"
                        alt="video de como registrar un usuario"
                        className="pb-2 pr-2 bg-gradient-to-bl from-[--cyan] to-[--yellow]"
                    />
                </section>
            )}
            {/* PASO 3: Jugar y responder preguntas*/}
            {step === 3 && (
                <section className="flex flex-col px-7 lg:w-max w-fit gap-y-6">
                    <header className="flex items-center gap-x-2">
                        <p className="font-black text-black text-lg text-center bg-[--yellow] p-2 w-8">
                            3
                        </p>
                        <h2 className="font-black text-lg">
                            Responde, acierta & gana
                        </h2>
                    </header>
                    <div className="max-w-[630px]">
                        <p className="mb-3">
                            Después de que escribas tu nombre, el manager
                            inciará las preguntas. Podrás contestar haciendo
                            click en la respuesta que creas correcta, no te lo
                            pienses mucho o se agotará el límite de tiempo.
                        </p>
                        <p className="mb-3">
                            Sé más rápido/a que tus rivales para conseguir más
                            puntuación. Una vez elegida la respuesta, podrás ver
                            si has acertado o no y cuántos participantes han
                            elegido qué respuesta.
                        </p>
                    </div>
                    <img
                        src="/instrucciones/Jugar-Jugador.gif"
                        alt="video de como registrar un usuario"
                        className="pb-2 pr-2 bg-gradient-to-bl from-[--cyan] to-[--yellow]"
                    />
                </section>
            )}
            {/* PASO 4: Puntuaciones*/}
            {step === 4 && (
                <section className="flex flex-col px-7 lg:w-max w-fit gap-y-6">
                    <header className="flex items-center gap-x-2">
                        <p className="font-black text-black text-lg text-center bg-[--yellow] p-2 w-8">
                            4
                        </p>
                        <h2 className="font-black text-lg">
                            Ránking de puntuaciones
                        </h2>
                    </header>
                    <div className="max-w-[630px]">
                        <p className="mb-3">
                            Una vez que todo el mundo haya participado, se
                            mostrarán las puntuaciones y comprobarás tu puesto
                            en el ránking.
                        </p>
                        <p className="mb-3">
                            Al lado de tu puntuación, verás la racha que llevas
                            &#40;cuantas veces seguidas has acertado&#41;.
                        </p>
                    </div>
                    <img
                        src="/instrucciones/Puntuaciones-Jugador.jpg"
                        alt="video de como registrar un usuario"
                        className="pb-2 pr-2 bg-gradient-to-bl from-[--cyan] to-[--yellow]"
                    />
                </section>
            )}
            {/* PASO 5: final*/}
            {step === 5 && (
                <section className="flex flex-col px-7 lg:w-max w-fit gap-y-6">
                    <header className="flex items-center gap-x-2">
                        <p className="font-black text-black text-lg text-center bg-[--yellow] p-2 w-8">
                            5
                        </p>
                        <h2 className="font-black text-lg">La gran final</h2>
                    </header>
                    <div className="max-w-[630px]">
                        <p className="mb-3">
                            Cuando se hayan respondido todas las preguntas,
                            aparecerá una pantalla con la puntuacion final y
                            mostrará el/la ganador/a del quiz
                        </p>
                    </div>
                    <img
                        src="/instrucciones/Ganador-Jugador.gif"
                        alt="video de como registrar un usuario"
                        className="pb-2 pr-2 bg-gradient-to-bl from-[--cyan] to-[--yellow]"
                    />
                </section>
            )}
            <button onClick={handleNextStep}>
                <div
                    className={`bg-[#FCFF00] rounded-full p-2 ${
                        step > 4 ? 'hidden' : 'block'
                    }`}
                >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                </div>
            </button>
        </article>
    );
}

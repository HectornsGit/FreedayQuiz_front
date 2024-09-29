'use client';
import { useState } from 'react';
import ChevronLeft from './icons/ChevronLeft';
import ChevronRight from './icons/ChevronRight';

export default function HowToPlayManager() {
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
                        step < 2 ? 'invisible' : 'visible'
                    }`}
                >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                </div>
            </button>
            {/* PASO 1: Registro*/}
            {step === 1 && (
                <section className="flex flex-col px-7 lg:w-max w-fit gap-y-6">
                    <header className="flex items-center gap-x-2">
                        <p className="font-black text-black text-lg text-center bg-[--yellow] p-2 w-8">
                            1
                        </p>
                        <h2 className="font-black text-lg">
                            Regístrate para crear quizes
                        </h2>
                    </header>
                    <div className="w-[630px]">
                        <p>Escribe tu nombre de usuario, email y contraseña</p>
                        <p>
                            Para finalizar el registro, pulsa el botón
                            Registrarse
                        </p>
                    </div>
                    <img
                        src="/instrucciones/registro.gif"
                        alt="video de como registrar un usuario"
                        className="pb-2 pr-2 bg-gradient-to-bl from-[--cyan] to-[--yellow]"
                    />
                </section>
            )}
            {/* PASO 2: Iniciar sesion*/}
            {step === 2 && (
                <section className="flex flex-col px-7 lg:w-max w-fit gap-y-6">
                    <header className="flex items-center gap-x-2">
                        <p className="font-black text-black text-lg text-center bg-[--yellow] p-2 w-8">
                            2
                        </p>
                        <h2 className="font-black text-lg">Inicia sesión</h2>
                    </header>
                    <div className="w-[630px]">
                        <p>
                            Escribe tu email y contraseña, si no recuerdas tu
                            contraseña, ¡no te preocupes!.
                        </p>

                        <p>
                            Puedes pulsar en el enlace &quot;He olvidado mi
                            contraseña&quot; para recuperarla
                        </p>
                    </div>
                    <img
                        src="/instrucciones/Inicio-Sesion.gif"
                        alt="video de como inciar sesión en la aplicaion web"
                        className="pb-2 pr-2 bg-gradient-to-bl from-[--cyan] to-[--yellow]"
                    />
                </section>
            )}
            {/* PASO 3: Crear Quiz*/}
            {step === 3 && (
                <section className="flex flex-col px-7 lg:w-max w-fit gap-y-6">
                    <header className="flex items-center gap-x-2">
                        <p className="font-black text-black text-lg text-center bg-[--yellow] p-2 w-8">
                            3
                        </p>
                        <h2 className="font-black text-lg">
                            ¡Crea tu primer quiz!
                        </h2>
                    </header>
                    <div className="w-[630px]">
                        <p>
                            Para empezar a crear tu primer quiz sólo tienes que
                            pulsar en el botón{' '}
                            <span className="text-[--yellow] font-medium">
                                añadir nuevo quiz
                            </span>
                            .
                        </p>
                        <p>
                            Se te abrirá un pop-up para que puedas ponerle un
                            nombre y una descripción
                        </p>
                    </div>
                    <img
                        src="/instrucciones/Crear-Quiz.gif"
                        alt="video de como crear un quiz"
                        className="pb-2 pr-2 bg-gradient-to-bl from-[--cyan] to-[--yellow]"
                    />
                </section>
            )}
            {/* PASO 4: Crear preguntas para el quiz*/}
            {step === 4 && (
                <section className="flex flex-col px-7 lg:w-max w-fit gap-y-6">
                    <header className="flex items-center gap-x-2">
                        <p className="font-black text-black text-lg text-center bg-[--yellow] p-2 w-8">
                            4
                        </p>
                        <h2 className="font-black text-lg">
                            Añade preguntas a tu quiz
                        </h2>
                    </header>
                    <div className="w-[630px]">
                        <p>
                            Para empezar a crear tu primer quiz sólo tienes que
                            pulsar en el botón{' '}
                            <span className="text-[--yellow] font-medium">
                                añadir nuevo quiz
                            </span>
                            .
                        </p>
                        <p>
                            Se te abrirá un pop-up para que puedas ponerle un
                            nombre y una descripción
                        </p>
                    </div>
                    <img
                        src="/instrucciones/Crear-Quiz.gif"
                        alt="video de como crear un quiz"
                        className="pb-2 pr-2 bg-gradient-to-bl from-[--cyan] to-[--yellow]"
                    />
                </section>
            )}
            <button onClick={handleNextStep}>
                <div
                    className={`bg-[#FCFF00] rounded-full p-2 ${
                        step > 12 ? 'invisible' : 'visible'
                    }`}
                >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                </div>
            </button>
        </article>
    );
}

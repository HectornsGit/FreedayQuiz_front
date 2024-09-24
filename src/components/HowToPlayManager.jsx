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

    {
        /* <article className="p-4 flex gap-x-8 w-fit lg:w-max"> */
    }
    return (
        <article className="flex flex-row">
            <button onClick={handlePrevStep}>
                <div className="bg-[#FCFF00] rounded-full p-2">
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                </div>
            </button>
            {/* PASO 1: Registro*/}
            {step === 1 && (
                <div className="flex flex-col px-7 lg:w-max w-fit">
                    <div className="flex items-center gap-x-2">
                        <p className="font-black text-black text-lg text-center bg-[--yellow] p-2 w-8">
                            1
                        </p>
                        <h2 className="font-black text-lg">
                            Regístrate para crear quizes
                        </h2>
                    </div>
                    <p>Instrucciones para creador/a de juego</p>
                    <p>
                        Despues de la explicacion, vendría un gif o video que se
                        ve dónde le clica y lo que pasa
                    </p>
                    <img
                        src="/registro.gif"
                        alt="video de como registrar un usuario"
                        className="pb-2 pr-2 bg-gradient-to-bl from-[--cyan] to-[--yellow]"
                    />
                </div>
            )}
            {/* PASO 2: Iniciar sesion*/}
            {step === 2 && <div className="flex-1">PASO 2 PASO 2</div>}
            <button onClick={handleNextStep}>
                <div className="bg-[#FCFF00] rounded-full p-2">
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                </div>
            </button>
        </article>
    );
}

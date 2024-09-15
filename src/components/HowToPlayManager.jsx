'use client';
import { useState } from 'react';

export default function HowToPlayManager() {
    //Quería dividir las intrucciones por pasos (steps) para no poner un churro de texto que la gente después le da pereza leer
    const [step, setStep] = useState(1); //El otro slider lo hice regulinchis con JS vainila, vamos a probar con estados

    // Funciones para navegar entre pasos del slider
    const nextStep = () => {
        if (step < steps.length) setStep(currentStep + 1);
    };

    const prevStep = () => {
        if (step > 1) setStep(currentStep - 1);
    };

    return (
        <article className="p-4">
            {/* <div className="flex items-center gap-x-2">
                <p className="font-black text-black text-lg text-center bg-[--yellow] p-2 w-8">
                    1
                </p>
                <h2 className="font-black text-lg">
                    Regístrate para crear quizes
                </h2>
            </div>
            <div>Instrucciones para creador/a de juego</div> */}
            {step === 1 && <div>PASO 1</div>}
            {step === 2 && <div>PASO 2 PASO 2</div>}
        </article>
    );
}

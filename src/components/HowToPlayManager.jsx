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
                        step < 2 ? 'hidden' : 'block'
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
                    <div className="max-w-[630px]">
                        <p className="mb-3">
                            Escribe tu nombre de usuario, email y contraseña
                        </p>
                        <p className="mb-3">
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
                    <div className="max-w-[630px]">
                        <p className="mb-3">
                            Escribe tu email y contraseña, si no recuerdas tu
                            contraseña, ¡no te preocupes!.
                        </p>

                        <p className="mb-3">
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
                    <div className="max-w-[630px]">
                        <p className="mb-3">
                            Para empezar a crear tu primer quiz sólo tienes que
                            pulsar en el botón&nbsp;
                            <span className="text-[--yellow] font-medium">
                                añadir nuevo quiz
                            </span>
                            .
                        </p>
                        <p className="mb-3">
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
                    <div className="max-w-[630px]">
                        <p>
                            En{' '}
                            <span className="font-bold text-xl">
                                {' '}
                                5 sencillos pasos
                            </span>{' '}
                            puedes crear las preguntas para tu quiz:
                        </p>
                        <ol>
                            <li>
                                <span className="text-[--yellow] font-black text-xl">
                                    1.
                                </span>
                                &nbsp;Agrega una imagen relacionada con la
                                pregunta, ¡puede dar alguna pista!
                            </li>
                            <li>
                                <span className="text-[--yellow] font-black text-xl">
                                    2.
                                </span>
                                &nbsp;Indica el tiempo, en segundos, que dura la
                                pregunta
                            </li>
                            <li>
                                <span className="text-[--yellow] font-black text-xl">
                                    3.
                                </span>
                                &nbsp;Escribe la pregunga que quieres formular
                            </li>
                            <li>
                                <span className="text-[--yellow] font-black text-xl">
                                    4.
                                </span>
                                &nbsp;Añade las respuestas posibles, puedes
                                añadir las que quieras y no te olvides de marcar
                                cual es la correcta
                            </li>
                            <li>
                                <span className="text-[--yellow] font-black text-xl">
                                    5.
                                </span>
                                &nbsp;Al terminar, haz click en el botón
                                &quot;Guardar pregunta&quot; para agregar la
                                pregunta al quiz
                            </li>
                        </ol>
                    </div>
                    <img
                        src="/instrucciones/Crear-Pregunta.gif"
                        alt="video de como crear preguntas para un quiz"
                        className="pb-2 pr-2 bg-gradient-to-bl from-[--cyan] to-[--yellow]"
                    />
                </section>
            )}
            {/* PASO 5: Edita & Elimina preguntas*/}
            {step === 5 && (
                <section className="flex flex-col px-7 lg:w-max w-fit gap-y-6">
                    <header className="flex items-center gap-x-2">
                        <p className="font-black text-black text-lg text-center bg-[--yellow] p-2 w-8">
                            5
                        </p>
                        <h2 className="font-black text-lg">
                            Edita preguntas del quiz
                        </h2>
                    </header>
                    <div className="max-w-[630px]">
                        {/*                         <h4 className="font-medium text-lg border-b-2">
                            Edita
                        </h4> */}
                        <p className="mb-3">
                            Podrás ver una lista con las preguntas creadas al
                            final del formulario, cada vez que crees una
                            pregunta, ésta se agregará a la lista de preguntas
                            creadas.
                        </p>
                        <p className="mb-3">
                            Para editar una pregunta, sólo tienes que hacer
                            click en la imagen correspondiente. Te cargará el
                            formulario de edicion con los datos de la pregunta.
                            Puedes cambiar cualquiera de los campos
                        </p>
                        <p className="mb-3">
                            No olvides pulsar el boton guardar pregunta para
                            conservar todos los cambios
                        </p>
                    </div>
                    <img
                        src="/instrucciones/Crear-Quiz.gif"
                        alt="video de como crear un quiz"
                        className="pb-2 pr-2 bg-gradient-to-bl from-[--cyan] to-[--yellow]"
                    />
                </section>
            )}
            {/* PASO 6: Edita & Elimina preguntas*/}
            {step === 6 && (
                <section className="flex flex-col px-7 lg:w-max w-fit gap-y-6">
                    <header className="flex items-center gap-x-2">
                        <p className="font-black text-black text-lg text-center bg-[--yellow] p-2 w-8">
                            6
                        </p>
                        <h2 className="font-black text-lg">
                            Elimina preguntas del quiz
                        </h2>
                    </header>
                    <div className="max-w-[630px]">
                        <p className="mb-3">
                            Selecciona la/s pregunta/s que quieres borrar
                            pulsando en la papelera correspondiente
                        </p>
                        <p className="mb-3">
                            Verás que las preguntas a eliminar cambiarán blanco
                            y negro. Pulsa el botón eliminar preguntas para
                            eliminar las preguntas elegidas
                        </p>
                    </div>
                    <img
                        src="/instrucciones/Crear-Quiz.gif"
                        alt="video de como crear un quiz"
                        className="pb-2 pr-2 bg-gradient-to-bl from-[--cyan] to-[--yellow]"
                    />
                </section>
            )}
            {/* PASO 7: Crear mas preguntas*/}
            {step === 7 && (
                <section className="flex flex-col px-7 lg:w-max w-fit gap-y-6">
                    <header className="flex items-center gap-x-2">
                        <p className="font-black text-black text-lg text-center bg-[--yellow] p-2 w-8">
                            7
                        </p>
                        <h2 className="font-black text-lg">
                            Crea todas las preguntas que necesites
                        </h2>
                    </header>
                    <div className="max-w-[630px]">
                        <p className="mb-3">
                            Si necesitas crear más preguntas, sólo tienes que
                            pulsar en la zona de abajo a la izquierda,
                            <span className="text-[--yellow] font-medium">
                                {' '}
                                &quot;Añadir pregunta&quot;
                            </span>
                        </p>
                        <p className="mb-3">
                            Se creará un formulario nuevo para que lo puedas
                            completar. Una vez completado, no olvides pulsar el
                            botón guardar edición
                        </p>
                    </div>
                    <img
                        src="/instrucciones/Crear-Quiz.gif"
                        alt="video de como crear un quiz"
                        className="pb-2 pr-2 bg-gradient-to-bl from-[--cyan] to-[--yellow]"
                    />
                </section>
            )}
            {/* PASO 8: Guarda todos los cambios del quiz*/}
            {step === 8 && (
                <section className="flex flex-col px-7 lg:w-max w-fit gap-y-6">
                    <header className="flex items-center gap-x-2">
                        <p className="font-black text-black text-lg text-center bg-[--yellow] p-2 w-8">
                            8
                        </p>
                        <h2 className="font-black text-lg">
                            Volver al perfil y ver los quizes creados
                        </h2>
                    </header>
                    <div className="max-w-[630px]">
                        <p className="mb-3">
                            Una vez que hayas terminado, podrás volver a tu
                            perfil y ver los quizes creados pulsando en el botón
                            volver a perfil
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
                        step > 7 ? 'hidden' : 'block'
                    }`}
                >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                </div>
            </button>
        </article>
    );
}

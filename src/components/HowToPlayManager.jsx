'use client';
import { useState } from 'react';
import ChevronLeft from './icons/ChevronLeft';
import ChevronRight from './icons/ChevronRight';
import Exit from './icons/Exit';

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
                            Escribe tu email y contraseña para acceder a tu
                            perfil.
                        </p>
                        <p className="mb-3">
                            Si no recuerdas tu contraseña ¡no te preocupes!,
                            puedes pulsar en el enlace &quot;He olvidado mi
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
                            nombre y una descripción. Pulsa en el botón crear
                            preguntas para empezar a crear las preguntas del
                            quiz
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
                                &nbsp;Escribe la pregunta que quieras formular
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
            {/* PASO 5: Edita preguntas*/}
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
                        <p className="mb-3">
                            Podrás ver una lista con las preguntas creadas al
                            final del formulario, cada vez que crees una
                            pregunta, ésta se agregará a la lista de preguntas
                            creadas.
                        </p>
                        <p className="mb-3">
                            Para editar una pregunta, sólo tienes que hacer
                            click en la imagen correspondiente. Te cargará el
                            formulario de edición con los datos de la pregunta.
                            Puedes cambiar cualquiera de los campos
                        </p>
                        <p className="mb-3">
                            No olvides pulsar el boton guardar pregunta para
                            conservar todos los cambios
                        </p>
                    </div>
                    <img
                        src="/instrucciones/Guardar-Preguntas.gif"
                        alt="video de como crear un quiz"
                        className="pb-2 pr-2 bg-gradient-to-bl from-[--cyan] to-[--yellow]"
                    />
                </section>
            )}
            {/* PASO 6: Elimina preguntas*/}
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
                            Selecciona la/s pregunta/s que quieras borrar
                            pulsando en la papelera correspondiente.
                        </p>
                        <p className="mb-3">
                            Verás que las preguntas a eliminar cambiarán a
                            blanco y negro. Pulsa el botón eliminar preguntas
                            para eliminar las preguntas elegidas.
                        </p>
                    </div>
                    <img
                        src="/instrucciones/Eliminar-Preguntas.gif"
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
                        src="/instrucciones/Editar-Preguntas.gif"
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
                        src="/instrucciones/Volver-Perfil.jpg"
                        alt="video de como crear un quiz"
                        className="pb-2 pr-2 bg-gradient-to-bl from-[--cyan] to-[--yellow]"
                    />
                </section>
            )}
            {/* PASO 9: Ediatr y eliminar quizes*/}
            {step === 9 && (
                <section className="flex flex-col px-7 lg:w-max w-fit gap-y-6">
                    <header className="flex items-center gap-x-2">
                        <p className="font-black text-black text-lg text-center bg-[--yellow] p-2 w-8">
                            9
                        </p>
                        <h2 className="font-black text-lg">
                            Edita y elimina quizes
                        </h2>
                    </header>
                    <div className="max-w-[630px]">
                        <p className="mb-3">
                            Para ver todos los quizes creados, pulsa en tu
                            avatar arriba a la derecha para desplegar el menú y
                            selecciona perfil.
                        </p>
                        <p className="mb-3">
                            En la página de tu perfil podrás editar tu
                            información como el nombre de usuario o la
                            contraseña.
                        </p>
                        <p className="mb-3">
                            Debajo del título y descripción de cada quiz, verás
                            un icono de lápiz para editar y el icono de una
                            papelera para borrar.
                        </p>
                    </div>
                    <img
                        src="/instrucciones/Editar-Eliminar-Quiz.gif"
                        alt="video de como crear un quiz"
                        className="pb-2 pr-2 bg-gradient-to-bl from-[--cyan] to-[--yellow]"
                    />
                </section>
            )}
            {/* PASO 10: Comenzar el juego*/}
            {step === 10 && (
                <section className="flex flex-col px-7 lg:w-max w-fit gap-y-6">
                    <header className="flex items-center gap-x-2">
                        <p className="font-black text-black text-lg text-center bg-[--yellow] p-2 w-8">
                            10
                        </p>
                        <h2 className="font-black text-lg">
                            3, 2, 1... ¡Empezamos la partida!
                        </h2>
                    </header>
                    <div className="max-w-[630px]">
                        <p className="mb-3">
                            Ahora que ya tenemos todo preparado, ¡es hora de
                            jugar!. Accede a tu perfil y pulsa el icono de mando
                            de consola.
                        </p>
                        <p className="mb-3">
                            Se abrirá otra ventana con un QR y un pin de juego
                            para que lo compartas con tu amigos/as y los pongas
                            a prueba.
                        </p>
                        <p className="mb-3">
                            Por último, indica el tiempo de la sesión
                            &#40;partida&#41; en minutos. Así evitaremos trampas
                            con respuestas fuera de tiempo.
                        </p>
                    </div>
                    <img
                        src="/instrucciones/Empezar-Quiz.gif"
                        alt="video de como crear un quiz"
                        className="pb-2 pr-2 bg-gradient-to-bl from-[--cyan] to-[--yellow]"
                    />
                </section>
            )}
            {/* PASO 11: Comenzar el juego*/}
            {step === 11 && (
                <section className="flex flex-col px-7 lg:w-max w-fit gap-y-6">
                    <header className="flex items-center gap-x-2">
                        <p className="font-black text-black text-lg text-center bg-[--yellow] p-2 w-8">
                            11
                        </p>
                        <h2 className="font-black text-lg">
                            Control de la partida
                        </h2>
                    </header>
                    <div className="max-w-[630px]">
                        <p className="mb-3">
                            Como manager podrás tener el control de la partida.
                            Si necesitas editar alguna pregunta o eliminarla,
                            podrás hacerlo tambien durante la partida.
                        </p>
                        <p className="mb-3">
                            Lo primero que verás es el tiempo que le resta a la
                            partida, si necesitas agregar más tiempo, lo podrás
                            hacer en cualquier momento pulsando al icono del
                            lápiz que hay a la derecha.
                        </p>
                        <p className="mb-3">
                            Tendrás siempre a mano el pin de la partida por si
                            fuera necesario compartirlo con algún/a imputal.
                        </p>
                        <p className="mb-3">
                            Podrás ver una lista de los/as jugadores/as
                            conectados/as, al final verás un botón con el icono
                            de usuarios. Púlsalo para desplegar la lista
                        </p>
                    </div>
                    <img
                        src="/instrucciones/Control-Partida.gif"
                        alt="video de como crear un quiz"
                        className="pb-2 pr-2 bg-gradient-to-bl from-[--cyan] to-[--yellow]"
                    />
                </section>
            )}
            {/* PASO 12: Edición en directo*/}
            {step === 12 && (
                <section className="flex flex-col px-7 lg:w-max w-fit gap-y-6">
                    <header className="flex items-center gap-x-2">
                        <p className="font-black text-black text-lg text-center bg-[--yellow] p-2 w-8">
                            12
                        </p>
                        <h2 className="font-black text-lg">
                            Edición en streaming
                        </h2>
                    </header>
                    <div className="max-w-[630px]">
                        <p className="mb-3">
                            Debajo de la imagen de la pregunta, verás un
                            deplegable con el listado de preguntas del quiz.
                            Pincha en la pregunta para seleccionarla
                        </p>
                        <p className="mb-3">
                            Una vez seleccionada, podrás eliminarla pulsando el
                            icono de la papelera que hay a la derecha, o bien,
                            puedes editarla pulsando en el botón editar al final
                            de la página &#40;icono lápiz&#41;
                        </p>
                        <p className="mb-3">
                            También podrás cambiar cual es la pregunta correcta,
                            seleccionado la respuesta en el círculo de la
                            derecha. Al guardar los cambios verás que el tick se
                            dibuja en la respuesta marcada.
                        </p>
                    </div>
                    <img
                        src="/instrucciones/Editar-Pregunta-Directo.gif"
                        alt="video de como crear un quiz"
                        className="pb-2 pr-2 bg-gradient-to-bl from-[--cyan] to-[--yellow]"
                    />
                </section>
            )}
            {/* PASO 13: Seleccionar modo de juego*/}
            {step === 13 && (
                <section className="flex flex-col px-7 lg:w-max w-fit gap-y-6">
                    <header className="flex items-center gap-x-2">
                        <p className="font-black text-black text-lg text-center bg-[--yellow] p-2 w-8">
                            13
                        </p>
                        <h2 className="font-black text-lg">
                            Seleccionar modo de juego
                        </h2>
                    </header>
                    <div className="max-w-[630px]">
                        <p className="mb-3">
                            Podrás elegir entre dos modos de juego:{' '}
                        </p>
                        <h4 className="font-medium text-lg border-b-2">
                            Automático
                        </h4>
                        <p className="mb-3">
                            Se mostrarán las preguntas y las puntuaciones de
                            forma automática,&nbsp;
                            <strong>
                                ¡podrás prestar atención a lo que responden
                                los/as jugadores/as!.
                            </strong>
                            &nbsp; Pausa el juego siempre que quieras pulsando
                            en el botón pausar juego
                        </p>
                        <h4 className="font-medium text-lg border-b-2">
                            Manual
                        </h4>
                        <p className="mb-3">
                            Selecciona la pregunta y pulsa el boton iniciar
                            pregunta. Cuando todos/as respondan a la pregunta,
                            se habilitará el botón mostrar puntuaciones para que
                            puedas enseñar la puntuación.
                        </p>
                        <p className="mb-3">
                            Si no quieres seguir un orden, pulsa el botón
                            pregunta aleatoria y se lanzará una pregunta de la
                            lista al azar.
                        </p>
                    </div>
                    <img
                        src="/instrucciones/Modo-Juego.gif"
                        alt="video de como crear un quiz"
                        className="pb-2 pr-2 bg-gradient-to-bl from-[--cyan] to-[--yellow]"
                    />
                </section>
            )}
            {/* PASO 13: Fin partida*/}
            {step === 14 && (
                <section className="flex flex-col px-7 lg:w-max w-fit gap-y-6">
                    <header className="flex items-center gap-x-2">
                        <p className="font-black text-black text-lg text-center bg-[--yellow] p-2 w-8">
                            14
                        </p>
                        <h2 className="font-black text-lg">
                            Puntuaciones finales
                        </h2>
                    </header>
                    <div className="max-w-[630px]">
                        <p className="mb-3">
                            Una vez realizadas todas las preguntas, muestra
                            quien ha ganado pulsando en el botón puntuacion
                            final
                        </p>
                        <p className="mb-3">
                            Guarda en un excel el listado de jugadores/as y
                            puntuaciones finales pulsando el boton descargar
                            resultados
                        </p>
                        <p className="mb-3 inline-block">
                            Para salir y finalizar el quiz pulsa el icono de
                            salir&nbsp;&nbsp;
                            <span className="float-right">
                                <Exit className="w-6 fill-[--yellow]" />
                            </span>
                        </p>
                    </div>
                    <img
                        src="/instrucciones/Descargar-Resultados.jpg"
                        alt="video de como crear un quiz"
                        className="pb-2 pr-2 bg-gradient-to-bl from-[--cyan] to-[--yellow]"
                    />
                </section>
            )}
            <button onClick={handleNextStep}>
                <div
                    className={`bg-[#FCFF00] rounded-full p-2 ${
                        step > 13 ? 'hidden' : 'block'
                    }`}
                >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                </div>
            </button>
        </article>
    );
}

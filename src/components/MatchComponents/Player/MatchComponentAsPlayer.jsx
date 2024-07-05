import { useState, useEffect } from 'react'

const MatchComponentAsPlayer = ({ answers }) => {
    //Esto marca el momento en el que hemos entrado en la pregunta.
    let startingTime = Date.now()

    // Iconos para las respuestas.
    const answerNames = ['🌞', '🌜', '🌟', '⚡']

    const [shuffledAnswers, setShuffledAnswers] = useState()

    const randomizeAnswers = (answers) => {
        // Número de preguntas es nuestro índice actual.
        let currentIndex = answers.length

        // Mientras ese número no sea 0...
        while (currentIndex != 0) {
            // Sacamos un índice aleatorio.
            let randomIndex = Math.floor(Math.random() * currentIndex)

            // Restamos 1 al índice actual
            currentIndex--

            // Los cambiamos entre sí.
            ;[answers[currentIndex], answers[randomIndex]] = [
                answers[randomIndex],
                answers[currentIndex],
            ]
        }
        return answers
    }

    useEffect(() => {
        setShuffledAnswers(randomizeAnswers(answers))
    }, [answers])

    const sendAnswer = (answer) => {
        // Le restamos al epoch en el que entramos la pregunta el epoch de cuando clicamos y eso nos da el tiempo en ms que tardamos en responder.
        const elapsedAnsweringTime = Date.now() - startingTime

        const answerAndTime = { answer, time: elapsedAnsweringTime }

        // Aquí hay que hacer socket.io shenanigans
        return answerAndTime
    }

    return (
        startingTime && (
            <div className="m-auto lg:w-5/6 sm:w-full ">
                {shuffledAnswers && (
                    <ul className="grid grid-cols-2 grid-rows-2 lg:gap-8 gap-4">
                        {shuffledAnswers.map((answer, index) => {
                            return (
                                <li
                                    key={index}
                                    className={
                                        'p-1 bg-gradient-to-r  flex items-center    from-indigo-700 from-9% via-sky-500 via-50% to-cyan-400 to-94%'
                                    }
                                >
                                    <button
                                        onClick={() => {
                                            sendAnswer(answer)
                                        }}
                                        className=" flex items-center h-full gap-6 text-start text-2xl p-4  hover:bg-inherit bg-black w-full"
                                    >
                                        <span className="font-bold">
                                            {answerNames[index]}
                                        </span>
                                        <span className=" lg:text-2xl md:text-xl text-base font-semibold">
                                            {answer}
                                        </span>
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                )}
            </div>
        )
    )
}
export default MatchComponentAsPlayer

import { useState, useEffect } from 'react'

const MatchComponentAsPlayer = ({ answers }) => {
    const [shuffledAnswers, setShuffledAnswers] = useState()

    const randomizeAnswers = (answers) => {
        // Número de preguntas es nuestro índice actual.
        let currentIndex = answers.length

        // Mientras ese número no sea 0...
        while (currentIndex != 0) {
            // Sacamos un índice aleatorio.
            let randomIndex = Math.floor(Math.random() * currentIndex)

            // Quitamos el índice actual
            currentIndex--

            // Los cambiamos entre sí.
            ;[answers[currentIndex], answers[randomIndex]] = [
                answers[randomIndex],
                answers[currentIndex],
            ]
        }
        return answers
    }

    const answerNames = ['🌞', '🌜', '🌟', '⚡']
    useEffect(() => {
        setShuffledAnswers(randomizeAnswers(answers))
    }, [])

    return (
        <div className=" m-auto lg:w-5/6 md:w-full ">
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
                                <button className=" flex items-center h-full gap-6 text-start text-2xl p-4  hover:bg-inherit bg-black w-full">
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
}
export default MatchComponentAsPlayer

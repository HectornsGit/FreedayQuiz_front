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

    useEffect(() => {
        setShuffledAnswers(randomizeAnswers(answers))
    }, [])

    return (
        <div className=" m-auto container border border-red-500">
            {shuffledAnswers && (
                <ul className="flex flex-col">
                    {shuffledAnswers.map((answer, index) => {
                        return (
                            <li
                                key={index}
                                className={
                                    index % 2 === 0
                                        ? 'bg-pink-950 '
                                        : 'bg-pink-700 '
                                }
                            >
                                <button>{answer}</button>
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    )
}
export default MatchComponentAsPlayer

'use client'
import TextInput from '@/components/TextInput'
import NumberInput from '@/components/NumberInput'
import ListAnswerInputs from './ListAnswerInputs'
import YellowPencil from '@/components/icons/YellowPencil'
import { useState } from 'react'

const MatchComponentAsManager = ({ managerProps }) => {
    const {
        signOut,
        endQuiz,
        findValue,
        handleQuestionChange,
        handleQuizChange,
        updateQuestionDataInBackend,
        updateQuizDataInBackend,
        nextQuestionHandler,
        handleStartQuiz,
        question,
        quizData,
        loggedUserId,
        playerData,
        shuffledQuestionResponses,
        initQuestion,
        timeLeft,
        showScoresHandler,
        connectedClients,
    } = managerProps

    const answersInputsProps = [
        {
            text: 'Opción A',
            id: 'optionA',
            name: 'optionA',
            value: findValue('optionA', shuffledQuestionResponses),
            handleChange: handleQuestionChange,
        },
        {
            text: 'Opción B',
            id: 'optionB',
            name: 'optionB',
            value: findValue('optionB', shuffledQuestionResponses),
            handleChange: handleQuestionChange,
        },
        {
            text: 'Opción C',
            id: 'optionC',
            name: 'optionC',
            value: findValue('optionC', shuffledQuestionResponses),
            handleChange: handleQuestionChange,
        },
        {
            text: 'Respuesta Correcta',
            id: 'correctAnswer',
            name: 'correctAnswer',
            value: findValue('correctAnswer', shuffledQuestionResponses),
            handleChange: handleQuestionChange,
        },
    ]
    const [isInput, setIsInput] = useState(false)
    return (
        <section>
            {quizData && (
                <section>
                    <article>
                        <h1 className="text-3xl font-bold">
                            {quizData?.title}
                        </h1>
                        <img src="https://cloudfront-eu-central-1.images.arcpublishing.com/prisaradiolos40/C4OWUGLJ2JIBDDLJOU7QRABT7Y.jpg" />
                    </article>
                </section>
            )}
            {playerData && (
                <section>
                    <h2>Jugadores: {connectedClients}</h2>
                    <ul>
                        {playerData.map((player) => (
                            <li key={player.id}>
                                Nickname: {player.name} Puntos:{' '}
                                {player.totalScore} Streak: {player.streak}
                                Puntos ultima pregunta:
                                {player.lastCorrectAnswer}
                                State: {player.state}
                            </li>
                        ))}
                    </ul>
                </section>
            )}
            {question && (
                <>
                    <p>Tiempo restante: {timeLeft}</p>
                    <p>Pregunta: {question?.question}</p>
                    <ul>
                        <h2>Respuestas:</h2>
                        <p>Respuesta correcta:{question.correctAnswer}</p>
                        <p>opción A:{question.optionA}</p>
                        <p>opción B:{question.optionB}</p>
                        <p>opción C:{question.optionC}</p>
                    </ul>
                </>
            )}
            {loggedUserId && loggedUserId == quizData?.owner_id && (
                <section className="flex flex-col justify-center">
                    <form className="md:flex-row  justify-center items-center gap-2 flex flex-col">
                        <TextInput
                            text={'Título'}
                            id={'title'}
                            value={quizData?.title}
                            handleChange={handleQuizChange}
                            isInput={isInput}
                        ></TextInput>
                        <TextInput
                            text={'Descripción'}
                            id={'description'}
                            value={quizData?.description}
                            handleChange={handleQuizChange}
                            isInput={isInput}
                        ></TextInput>

                        <button
                            className="text-black font-extrabold text-lg bg-white px-11 py-2 
    hover:bg-black hover:text-white hover:box-shadow-white mt-5"
                            onClick={updateQuizDataInBackend}
                        >
                            Envíar
                        </button>
                    </form>
                    <form className="grid place-items-center  grid-cols-2 grid-rows-2">
                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                setIsInput(!isInput)
                            }}
                        >
                            <YellowPencil className={'w-4'}></YellowPencil>
                        </button>
                        <TextInput
                            text={'Pregunta Siguiente'}
                            id={'question'}
                            name={'question'}
                            value={findValue(
                                'question',
                                shuffledQuestionResponses
                            )}
                            handleChange={handleQuestionChange}
                            isInput={isInput}
                        ></TextInput>
                        <NumberInput
                            text={'Tiempo'}
                            id={'questionTime'}
                            name={'questionTime'}
                            value={findValue(
                                'questionTime',
                                shuffledQuestionResponses
                            )}
                            handleChange={handleQuestionChange}
                        ></NumberInput>
                        <ListAnswerInputs
                            answerPropsList={answersInputsProps}
                        ></ListAnswerInputs>

                        <button
                            className="text-black font-extrabold text-lg bg-white px-11 py-2 
    hover:bg-black hover:text-white hover:box-shadow-white mt-5 col-span-2"
                            type="button"
                            onClick={updateQuestionDataInBackend}
                        >
                            Actualiza la pregunta
                        </button>
                    </form>
                    <button
                        className="text-black font-extrabold text-lg bg-white px-11 py-2 
    hover:bg-black hover:text-white hover:box-shadow-white mt-5"
                        onClick={
                            question ? nextQuestionHandler : handleStartQuiz
                        }
                    >
                        Nueva pregunta
                    </button>
                    <button
                        className="text-black font-extrabold text-lg bg-white px-11 py-2 
    hover:bg-black hover:text-white hover:box-shadow-white mt-5"
                        onClick={initQuestion}
                    >
                        Iniciar pregunta para los jugadores
                    </button>
                    <button
                        className="text-black font-extrabold text-lg bg-white px-11 py-2 
    hover:bg-black hover:text-white hover:box-shadow-white mt-5"
                        onClick={showScoresHandler}
                    >
                        Mostrar puntaciones
                    </button>
                    <button
                        className="text-black font-extrabold text-lg bg-white px-11 py-2 
    hover:bg-black hover:text-white hover:box-shadow-white mt-5"
                        onClick={endQuiz}
                    >
                        Finalizar quiz
                    </button>
                </section>
            )}
            <button onClick={signOut}>Cerrar sesión</button>
        </section>
    )
}
export default MatchComponentAsManager

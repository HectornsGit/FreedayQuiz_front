import TrashCan from '@/components/icons/TrashCan';

const NoneditableQuestion = ({
    isInput,
    getQuestionFromList,
    disableQuestionsButton,
    question,
    quizData,
    deleteQuestionHandler,
}) => {
    return (
        isInput === false && (
            <ul className="flex justify-between 2xl:w-4/6  w-full gap-2">
                <li className="justify-self-start grow ">
                    <select
                        className="sm:5/6s w-full md:w-full  font-bold mb-2  p-2  z-10 text-black text-sm sm:text-md py-2"
                        onChange={getQuestionFromList}
                        disabled={disableQuestionsButton}
                        value={question.questionNumber}
                    >
                        {quizData &&
                            quizData.list_of_questions?.map(
                                (question, index) => {
                                    return (
                                        <option
                                            className=" whitespace-pre-wrap font-semibold py-2 selection:bg-slate-400"
                                            key={index}
                                            value={question.number}
                                        >
                                            {window.innerWidth < 1280
                                                ? window.innerWidth < 400
                                                    ? `${question.number}. ${question.title}`
                                                          .length > 26
                                                        ? `${question.number}. ${question.title}`.substring(
                                                              0,
                                                              26
                                                          ) + '...'
                                                        : `${question.number}. ${question.title}`
                                                    : `${question.number}. ${question.title}`
                                                            .length > 50
                                                      ? `${question.number}. ${question.title}`.substring(
                                                            0,
                                                            48
                                                        ) + '...'
                                                      : `${question.number}. ${question.title}`
                                                : `${question.number}. ${question.title}`}
                                        </option>
                                    );
                                }
                            )}
                    </select>
                </li>
                <li className={(isInput ? 'pb-10 ' : '') + 'self-center'}>
                    <button
                        disabled={disableQuestionsButton}
                        type="button"
                        className="text-[--yellow] text-sm"
                        onClick={deleteQuestionHandler}
                    >
                        <TrashCan
                            className={'rounded-sm p-1 w-8  bg-[--yellow]'}
                        ></TrashCan>
                    </button>
                </li>
            </ul>
        )
    );
};
export default NoneditableQuestion;

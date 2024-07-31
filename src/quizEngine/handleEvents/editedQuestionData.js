import { toast } from 'react-toastify';
const editedQuestionData = (
    socket,
    setQuestionData,
    loggedUserId,
    quizData,
    setQuizData
) => {
    if (socket) {
        socket.on(
            socket.on('questionUpdatedMessage', (data) => {
                if (data.status === 'ok') {
                    const newData = quizData.list_of_questions.map(
                        (question) => {
                            if (
                                question.number ===
                                data.questionUpdated.questionNumber
                            ) {
                                return {
                                    title: data.questionUpdated.question,
                                    number: data.questionUpdated.questionNumber,
                                };
                            }
                            return question;
                        }
                    );
                    setQuizData((prevData) => {
                        return { ...prevData, list_of_questions: newData };
                    });
                    setQuestionData(data.questionUpdated);
                    if (loggedUserId && loggedUserId == quizData.owner_id) {
                        toast.success(data.message);
                    }
                } else {
                    if (loggedUserId && loggedUserId == quizData.owner_id) {
                        toast.error(data.message);
                    }
                }
            })
        );
    }
};
export default editedQuestionData;

import React, { useState } from 'react';

const profileContext = React.createContext();

const ProfileProvider = ({ children }) => {
    //Estado con los datos del usuario registrado:
    const [userInfo, setUserInfo] = useState(null);
    const updateBasicData = (data) => {
        setUserInfo((prevData) => {
            const newData = prevData.quizzes.map((quiz) => {
                if (quiz.id === data.id) {
                    return {
                        title: data.title,
                        description: data.description,
                        id: quiz.id,
                        questions: quiz.questions,
                    };
                }

                return quiz;
            });
            return { ...prevData, quizzes: newData };
        });
    };

    //Datos de los quizes en el perfil de usuario:
    const [dataQuizz, setDataQuizz] = useState([]);
    const updateQuizData = (data) => {
        setDataQuizz((prevData) => {
            const newData = prevData.map((question) => {
                if (question.questionId === data.id) {
                    return {
                        idQuiz: question.idQuiz,
                        questionId: question.questionId,
                        questionImage: data.image,
                        questionNumber: question.questionNumber,
                    };
                }

                return question;
            });
            return newData;
        });
    };

    return (
        <profileContext.Provider
            value={{
                userInfo,
                setUserInfo,
                dataQuizz,
                setDataQuizz,
                updateQuizData,
                updateBasicData,
            }}
        >
            {children}
        </profileContext.Provider>
    );
};

export { ProfileProvider, profileContext };

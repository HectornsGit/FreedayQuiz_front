// quizReducer.js
import { ActionTypes } from './actions';

const quizReducer = (state, action) => {
    switch (action.type) {
        case ActionTypes.SET_IS_NAME_SETTED:
            return { ...state, isNameSetted: action.payload };
        case ActionTypes.SET_IS_QUESTION_RUNNING:
            return { ...state, isQuestionRunning: action.payload };
        case ActionTypes.SET_IS_DISABLED:
            return { ...state, isDisabled: action.payload };
        case ActionTypes.SET_SESSION_RECOVERY:
            return { ...state, sessionRecovery: action.payload };
        case ActionTypes.SET_IS_CLOCK_INPUT:
            return { ...state, isClockInput: action.payload };
        case ActionTypes.SET_IS_INPUT:
            return { ...state, isInput: action.payload };
        case ActionTypes.SET_IS_THERE_A_WINNER:
            return { ...state, isThereAWinner: action.payload };
        case ActionTypes.SET_JOINED_QUIZ:
            return { ...state, _joinedQuiz: action.payload };
        case ActionTypes.SET_IS_MASTER_ONLINE:
            return { ...state, isMasterOnline: action.payload };
        case ActionTypes.SET_SHOW_SCORES:
            return { ...state, showScores: action.payload };
        default:
            return state;
    }
};

export default quizReducer;

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
        case ActionTypes.SET_TIME_LEFT:
            return { ...state, timeLeft: action.payload };
        case ActionTypes.SET_ERROR:
            return { ...state, error: action.payload };
        case ActionTypes.SET_SOCKET:
            return { ...state, socket: action.payload };
        case ActionTypes.SET_SESSION_TIME:
            return { ...state, sessionTime: action.payload };
        case ActionTypes.SET_NICKNAME:
            return { ...state, nickName: action.payload };
        case ActionTypes.SET_CLICKED_RESPONSES:
            return { ...state, clickedResponses: action.payload };
        case ActionTypes.SET_SESSION_TIME_LEFT:
            return { ...state, sessionTimeLeft: action.payload };
        case ActionTypes.SET_CONNECTED_CLIENTS:
            return { ...state, connectedClients: action.payload };
        case ActionTypes.SET_QUESTION:
            return { ...state, question: action.payload };
        case ActionTypes.SET_QUESTION_TO_DELETE:
            return {
                ...state,
                questionsToDelete: [...state.questionsToDelete, action.payload],
            };
        default:
            return state;
    }
};

export default quizReducer;

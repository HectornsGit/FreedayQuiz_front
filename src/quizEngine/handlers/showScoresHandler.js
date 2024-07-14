import { calculateResults } from '../utils'
const showScoresHandler = (socket, quizId, playerData) => {
    const states = {
        isQuestionRunning: false,
        showScores: true,
        isDisabled: true,
    }
    const hitsResults = calculateResults(playerData)

    if (socket) {
        socket.emit('showScores', quizId, states, hitsResults)
    }
}
export default showScoresHandler

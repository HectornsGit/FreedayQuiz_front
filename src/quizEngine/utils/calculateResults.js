const calculateResults = (playerData) => {
    let hits = {}
    playerData.forEach((player) => {
        hits[player.lastAnswerText] = (hits[player.lastAnswerText] || 0) + 1
    })
    return hits
}
export default calculateResults

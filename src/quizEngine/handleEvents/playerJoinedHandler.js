const playerJoinedHandler = (socket, setPlayerData, quizId) => {
    if (socket) {
        socket.on('playerJoined', (data) => {
            //Actualizo el estado playerData
            setPlayerData(data)
        })
    }
}
export default playerJoinedHandler

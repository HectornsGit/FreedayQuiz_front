const playerJoinedHandler = (socket, setPlayerData, quizId) => {
    if (socket) {
        socket.on('playerJoined', (data) => {
            //Actualizo el estado playerData:
            setPlayerData((prevPlayerData) => [...prevPlayerData, data])
        })
    }
}
export default playerJoinedHandler

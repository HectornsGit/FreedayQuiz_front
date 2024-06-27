const playerJoinedHandler = (socket, setPlayerData) => {
    if (socket) {
        socket.on('playerJoined', (data) => {
            setPlayerData((prevPlayerData) => [...prevPlayerData, data])
        })
    }
}
export default playerJoinedHandler

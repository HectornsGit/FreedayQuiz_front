const playerJoinedHandler = (socket, setPlayerData) => {
    if (socket) {
        socket.on('playerJoined', (data) => {
            //Guardo el nickName en el socket, para acceder a él en caso necesario:
            socket.Mydata = { name: data.name }
            setPlayerData((prevPlayerData) => [...prevPlayerData, data])
        })
    }
}
export default playerJoinedHandler

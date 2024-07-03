const clientsNumberHandler = (
    socket,
    setConnectedClients,
    playerData,
    setPlayerData
) => {
    if (socket) {
        socket.on('clientsNumber', (data, socketData) => {
            setConnectedClients(data)

            //Recibo el socket de las conexiones y desconexiones, las comparto y actualizo el campo state de playerData:
            if (playerData.length > 0) {
                setPlayerData((prevPlayerData) =>
                    prevPlayerData.map((player) => {
                        if (player.id === socketData.playerId) {
                            return player.state === 'online'
                                ? { ...player, state: 'offline' }
                                : { ...player, state: 'online' }
                        } else {
                            return player
                        }
                    })
                )
            }
        })
    }
}
export default clientsNumberHandler

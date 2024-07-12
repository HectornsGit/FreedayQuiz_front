import { toast } from 'react-toastify'

const clientsNumberHandler = (
    socket,
    setConnectedClients,
    playerData,
    setPlayerData
) => {
    if (socket) {
        socket.on(
            'clientsNumber',
            (clientsNumber, socketData, connectionState) => {
                setConnectedClients(clientsNumber)

                //Recibo el socket de las conexiones y desconexiones, las comparto y actualizo el campo state de playerData:
                if (playerData.length > 0) {
                    setPlayerData((prevPlayerData) =>
                        prevPlayerData.map((player) => {
                            if (player.id === socketData.playerId) {
                                if (connectionState === 'connected') {
                                    return { ...player, state: 'online' }
                                } else {
                                    return { ...player, state: 'offline' }
                                }
                            } else {
                                return player
                            }
                        })
                    )
                }
            }
        )
    }
}
export default clientsNumberHandler

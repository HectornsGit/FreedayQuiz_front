const clientsNumberHandler = (socket, setConnectedClients) => {
    if (socket) {
        console.log('Datos llegando...')
        socket.on('clientsNumber', (data) => {
            setConnectedClients(data)
        })
    }
}
export default clientsNumberHandler

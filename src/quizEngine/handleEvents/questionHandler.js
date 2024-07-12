const questionHandler = (socket, setQuestion) => {
    if (socket) {
        socket.on('question', (data) => {
            setQuestion(null)
            //Trucazo para asegurarse de que primero se ejecute el setQuestion de arriba y luego el de abajo.
            setTimeout(() => {
                setQuestion(data)
            }, 0)
        })
    }
}

export default questionHandler

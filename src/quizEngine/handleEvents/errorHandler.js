const errorHandler = (socketInstance, setError) => {
    socketInstance.on('error', (error) => {
        setError(null)
        setTimeout(() => {
            setError(error.message)
        }, 0)
    })
}
export default errorHandler

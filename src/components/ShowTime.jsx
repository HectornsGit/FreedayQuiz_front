const ShowTime = ({ time }) => {
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = time % 60

    return (
        <>
            <p>Tiempo de la sesión</p>
            <p>
                {hours > 0 && `${hours}:`}
                {minutes < 10 ? `0${minutes}` : minutes}:
                {seconds < 10 ? `0${seconds}` : seconds} segundos
            </p>
        </>
    )
}

export default ShowTime

const ShowTime = ({ time, handler }) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return (
        <>
            <p>Tiempo de la sesión</p>
            <p>
                {hours > 0 && `${hours}:`}
                {minutes < 10 ? `0${minutes}` : minutes}:
                {seconds < 10 ? `0${seconds}` : seconds} segundos
            </p>
            <form onSubmit={handler}>
                <input type="text" id="session" name="session" required />
                <button type="submit">Edita el tiempo de sesión</button>
            </form>
        </>
    );
};

export default ShowTime;

const setWinnerOn = (socket, setIsThereAWinner) => {
    if (socket) {
        socket.on('setWinnerOn', () => {
            setIsThereAWinner(true);
        });
    }
};
export default setWinnerOn;

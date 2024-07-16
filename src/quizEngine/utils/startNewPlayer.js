const startNewPlayer = (
    router,
    params,
    setIsNameSetted,
    setSessionRecovery,
    _socket
) => {
    const quizId = params && params.quizId.toString();
    window.localStorage.removeItem('idNewPlayer');
    window.localStorage.removeItem('playerName');
    window.localStorage.removeItem('quizId');
    router.push(process.env.NEXT_PUBLIC_FRONT + `/socket/${quizId}`);
    setIsNameSetted(false);
    setSessionRecovery(false);
};
export default startNewPlayer;

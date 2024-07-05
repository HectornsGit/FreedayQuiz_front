const startNewPlayer = (router, params, setIsNameSetted) => {
    const quizId = params && params.quizId.toString()
    window.localStorage.removeItem('idNewPlayer')
    window.localStorage.removeItem('playerName')
    router.push(process.env.NEXT_PUBLIC_FRONT + `/socket/${quizId}`)
    setIsNameSetted(false)
}
export default startNewPlayer

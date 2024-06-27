//Para actualizar datos del quiz:
const handleQuizChange = (setQuizData) => (e) => {
    const { name, value } = e.target
    setQuizData((prevData) => ({
        ...prevData,
        [name]: value,
    }))
}
export default handleQuizChange

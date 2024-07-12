//Función para poner el value correspondiente a los inputs de las preguntas
const findValue = (name, shuffledQuestionResponses) => {
    const value = shuffledQuestionResponses?.forEach((item) => {
        if (item.hasOwnProperty(name)) {
            return item[name]
        }
    })
    return value
}
export default findValue

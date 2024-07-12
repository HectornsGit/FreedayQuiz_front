//Para actualizar las preguntas:
const handleQuestionChange =
    (setShuffledQuestionResponses, shuffledQuestionResponses) => (e) => {
        const { name, value } = e?.target
        setShuffledQuestionResponses((prevData) => {
            if (prevData) {
                let updatedResponses
                const index = prevData.findIndex(
                    (i) =>
                        i === question[name] ||
                        (updatedResponses && i === updatedResponses[name]) ||
                        i === shuffledQuestionResponses[name]
                )

                updatedResponses = prevData.map((item) => {
                    if (item === shuffledQuestionResponses[index]) {
                        return value
                    }
                    return item
                })

                return updatedResponses
            } else {
                toast.warning(
                    'Aún no hay datos, clica en "Start quiz" para traer la primea pregunta'
                )
                return
            }
        })
    }
export default handleQuestionChange

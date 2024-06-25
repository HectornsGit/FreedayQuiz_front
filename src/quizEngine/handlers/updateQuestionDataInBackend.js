import { toast } from 'react-toastify'

const updateQuestionDataInBackend =
    (setQuestion, socket, quizId, question) => (e) => {
        e.preventDefault()
        if (!question) {
            toast.error(
                'Aún no hay preguntas. Trae la primera clicando en "Start quiz" '
            )
            return
        }
        const form = e.target.form || e.target

        // Primero seteo el estado question:
        setQuestion((prevData) => {
            const datafromForm = {
                question: form.elements.question.value,
                questionTime: form.elements.questionTime.value,
                optionA: form.elements.optionA.value,
                optionB: form.elements.optionB.value,
                optionC: form.elements.optionC.value,
                correctAnswer: form.elements.correctAnswer.value,
            }
            const updatedData = { ...prevData }
            for (const [key, value] of Object.entries(datafromForm)) {
                if (value !== '') {
                    updatedData[key] = value
                }
            }
            // Ahora lo envío al backend:
            if (socket) {
                socket.emit('updateQuestionData', quizId, updatedData)
                socket.on('questionUpdatedMessage', (data) =>
                    toast.success(data.message)
                )
            }
            return updatedData
        })
    }

export default updateQuestionDataInBackend

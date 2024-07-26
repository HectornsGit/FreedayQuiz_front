import TextInput from '@/components/TextInput'
const ListAnswerInputs = ({ answerPropsList }) => {
    return (
        <ul className="col-span-2  grid grid-cols-2 grid-rows-2 ">
            {answerPropsList.length > 0 &&
                answerPropsList.map((answerProps) => {
                    const { text, id, value, handleQuestionChange } =
                        answerProps
                    return (
                        <li key={id}>
                            <TextInput
                                text={text}
                                id={id}
                                name={id}
                                value={value}
                                handleChange={handleQuestionChange}
                            ></TextInput>
                        </li>
                    )
                })}
        </ul>
    )
}
export default ListAnswerInputs

import YellowBgSendPlane from './icons/yellowBgSendPlane'
import YellowPencil from './icons/YellowPencil'

const TextInput = ({ id, text, isInput, value, handleChange }) => {
    const handleChangeInput = (e) => {
        e.preventDefault()
    }
    return (
        <div className="flex w-60 my-6 flex-col items-start m-2">
            <label className="text-md my-3 font-medium" htmlFor={id}>
                {text}
            </label>
            {isInput ? (
                <ul className="flex">
                    <li>
                        <input
                            className="font-semibold  p-2  text-black text-md py-2"
                            type="text"
                            id={id}
                            name={id}
                            value={value}
                            onChange={handleChange}
                        />
                    </li>
                    <li>
                        <button onClick={handleChangeInput}>
                            <YellowBgSendPlane
                                className={'w-10 p-1'}
                            ></YellowBgSendPlane>
                        </button>
                    </li>
                </ul>
            ) : (
                <p className=" font-medium">{value}</p>
            )}
        </div>
    )
}
export default TextInput

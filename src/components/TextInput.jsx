'use client'

const TextInput = ({ id, text, isArea = false, value, handleChange }) => {
    return (
        <div className="flex w-60 my-6 flex-col items-start">
            <label className=" bg-black px-2 text-md " htmlFor={id}>
                {text}
            </label>
            {isArea ? (
                <textarea
                    className=" font-semibold p-2 min-h-12 pr-6  text-black text-md py-2"
                    type="text"
                    id={id}
                    name={id}
                    value={value}
                    onChange={handleChange}
                />
            ) : (
                <input
                    className="font-semibold  z-10 p-2 pr-6 text-black text-md py-2"
                    type="text"
                    id={id}
                    name={id}
                    value={value}
                    onChange={handleChange}
                />
            )}
        </div>
    )
}
export default TextInput

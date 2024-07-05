'use client'

const TextInput = ({ id, text, isArea = false, value, handleChange }) => {
    return (
        <div className="flex w-60 my-6 flex-col items-start m-2">
            <label className=" bg-black px-2 text-md " htmlFor={id}>
                {text}
            </label>
            {isArea ? (
                <textarea
                    className="col-span-2 font-semibold p-2 min-h-20 min-w-56   text-black text-sm py-2"
                    type="text"
                    id={id}
                    name={id}
                    value={value}
                    onChange={handleChange}
                />
            ) : (
                <input
                    className="font-semibold  p-2  text-black text-md py-2"
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

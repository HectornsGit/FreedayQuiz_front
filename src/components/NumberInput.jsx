'use client'

const NumberInput = ({ id, text, value, handleChange }) => {
    return (
        <div className="flex w-20 my-6 flex-col items-start m-2">
            <label className=" bg-black px-2 text-md " htmlFor={id}>
                {text}
            </label>
            <input
                className="font-semibold w-20  p-2  text-black text-md py-2"
                type="number"
                id={id}
                name={id}
                value={value}
                onChange={handleChange}
            />
        </div>
    )
}
export default NumberInput

'use client';

const NumberInput = ({ id, text, value, isInput, handleChange }) => {
    return (
        <div className="flex font-medium  text-left my-6 flex-col items-start m-2">
            <label className="text-md " htmlFor={id}>
                {text}
            </label>
            {isInput ? (
                <input
                    className="font-semibold w-20  p-2  text-black text-md py-2"
                    type="number"
                    id={id}
                    name={id}
                    value={value}
                    onChange={handleChange}
                />
            ) : (
                <p className="font-semibold w-20  p-2  text-black text-md py-2">
                    {value}
                </p>
            )}
        </div>
    );
};
export default NumberInput;

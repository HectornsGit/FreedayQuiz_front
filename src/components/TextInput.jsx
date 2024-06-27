'use client'

import { useState } from 'react'

const TextInput = ({ id, text, isArea=false }) => {
    const [data, setData] = useState()
    return (
        <div className="flex w-60 my-6  flex-col items-start">
            <label
                className="mx-8  bg-black px-2 text-md "
                htmlFor={id}
            >
                {text}
            </label>
            {isArea ? (
                <textarea
                    className=" mx-8 font-semibold p-2 min-h-12 pr-6  text-black text-md py-2"
                    type="text"
                    id={id}
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                />
            ) : (
                <input
                    className="mx-8 font-semibold  z-10 p-2 pr-6 text-black text-md py-2"
                    type="text"
                    id={id}
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                />
            )}
        </div>
    )
}
export default TextInput

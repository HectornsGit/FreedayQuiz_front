'use client'

import { useState } from 'react'

const TextInput = ({ id, text }) => {
    const [data, setData] = useState()
    const [isExpanded, setIsExpanded] = useState(false)
    return (
        <div className="flex w-60 my-6  flex-col items-start">
            <label
                className="mx-8 position relative inset-y-4 bg-black px-2 text-md "
                htmlFor={id}
            >
                {text}
            </label>
            <button
                className="bg-blue-300 m-0 p-0 self-end w-4 h-4 z-30 relative top-7 left-4"
                onClick={(e) => {
                    e.preventDefault()
                    setIsExpanded(!isExpanded)
                }}
            ></button>
            {isExpanded ? (
                <textarea
                    className=" mx-8 font-semibold z-10 p-2 min-h-12 pr-6  text-black text-md py-2"
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

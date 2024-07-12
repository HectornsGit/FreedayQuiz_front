'use client'

import { useState } from 'react'
import YellowBgSendPlane from './icons/yellowBgSendPlane'
import YellowPencil from './icons/YellowPencil'

const TextInput = ({ id, text, value, handleChange }) => {
    const [isInput, setIsInput] = useState(false)
    const handleChangeInput = (e) => {
        e.preventDefault()
        setIsInput(!isInput)
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
                <ul className="flex items-center gap-2">
                    <li>
                        <button onClick={handleChangeInput}>
                            <YellowPencil className={'w-4'}></YellowPencil>
                        </button>
                    </li>
                    <li>
                        <p className=" font-medium">{value}</p>
                    </li>
                </ul>
            )}
        </div>
    )
}
export default TextInput

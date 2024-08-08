'use client';
import { useState } from 'react';
const Accordion = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="w-screen px-6 sm:full xl:w-80 lg:w-72">
            <button
                onClick={toggleAccordion}
                className="w-full text-xl font-semibold p-2 text-left flex gap-2 items-center text-[--yellow] border-b border-[--yellow] focus:outline-none"
            >
                <span className="font-bold ">+ </span>
                <span>{title}</span>
            </button>
            {isOpen && <div className="py-2 text-white">{children}</div>}
        </div>
    );
};
export default Accordion;

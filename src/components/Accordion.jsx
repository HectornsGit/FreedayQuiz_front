'use client';
import { useState } from 'react';
import ChevronDown from './icons/ChevronDown';
import ChevronUp from './icons/ChevronUp';
const Accordion = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="w-screen px-6 sm:full xl:w-80 lg:w-72">
            <button
                onClick={toggleAccordion}
                className="w-full justify-between
                 text-xl font-semibold p-2 text-left flex gap-2 items-center text-black bg-[--yellow] border-b border-[--yellow] focus:outline-none"
            >
                <span>{title}</span>
                <span className="font-bold">
                    {isOpen ? (
                        <ChevronUp
                            className={'mb-1 h-6  rounded-sm  bg-[--yellow]'}
                        />
                    ) : (
                        <ChevronDown
                            className={'mb-1 h-6 rounded-sm   bg-[--yellow]'}
                        />
                    )}
                </span>
            </button>
            {isOpen && <div className="py-2 text-white">{children}</div>}
        </div>
    );
};
export default Accordion;

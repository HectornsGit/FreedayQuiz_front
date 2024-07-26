'use client';
import { useState } from 'react';
const Accordion = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="overflow-hidden shadow-lg">
            <button
                onClick={toggleAccordion}
                className="w-full p-4  text-left text-lg font-semibold text-black bg-[--yellow] focus:outline-none"
            >
                {title}
            </button>
            {isOpen && (
                <div className="p-4 bg-white text-gray-700">{children}</div>
            )}
        </div>
    );
};
export default Accordion;

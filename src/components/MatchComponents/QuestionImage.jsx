'use client';
import { useEffect, useState } from 'react';
const QuestionImage = ({ image }) => {
    const [route, setRoute] = useState(
        'http://localhost:4000/uploads/' + image
    );
    useEffect(() => {
        setRoute('http://localhost:4000/uploads/' + image);
    }, [image]);
    return (
        <div className="w-4/6 sm:w-96 self-center">
            <img src={route} className="object-cover"></img>
        </div>
    );
};
export default QuestionImage;

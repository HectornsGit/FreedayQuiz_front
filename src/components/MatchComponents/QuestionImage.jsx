/* eslint-disable @next/next/no-img-element */
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
        <div className="self-center">
            <img
                src={route}
                alt="Imagen de la pregunta"
                className="object-cover"
            ></img>
        </div>
    );
};
export default QuestionImage;

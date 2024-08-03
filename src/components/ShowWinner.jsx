import { useState, useEffect } from 'react';
import Trophy from './icons/Trophy';
import Confetti from 'react-confetti';

const ShowWinner = ({ winner }) => {
    //Necesito setear el ancho de la ventana para que el efecto del confetti se vaya ajustando según anchura de dispositivo
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    //Esta es una función que asigna al estado windowSize la altura y anchura de la ventana
    const handleWindowSize = () => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
        console.log(window.innerWidth, window.innerHeight);
    };

    //Como queremos saber la anchura/altura de la ventana cada vez que estos valores cambien pues usamos useEfect
    useEffect(() => {
        //cuando se redimensione que llame al handle
        window.onresize = () => handleWindowSize();
    }, []);

    return (
        <>
            <Confetti
                width={windowSize.width}
                height={windowSize.height}
                numberOfPieces={80}
            />
            <section className="flex flex-col items-center mb-8">
                <Trophy className="w-[10rem] mb-4" />
                <p className="text-xl">Ganador/a</p>
                <h3 className="text-3xl font-bold">{winner}</h3>
            </section>
        </>
    );
};

export default ShowWinner;

import { useState, useEffect } from 'react';

const useShowWinner = () => {
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
    return { windowSize, setWindowSize, handleWindowSize };
};
export default useShowWinner;

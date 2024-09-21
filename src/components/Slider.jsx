//importamos flecha izquierda y flecha derecha
import ChevronLeft from './icons/ChevronLeft';
import ChevronRight from './icons/ChevronRight';
import { useRef } from 'react';

export default function Slider({ children }) {
    const slider = useRef(null);
    /*con esto conseguimos referenciar un componente, 
    es parecido a poner getElementById PERO se ajusta y aprovecha las caractersiticas de REACT
    como por ejemplo, que no re-renderiza el componente al cambiar su estado(importarte para este uso del slider)*/

    //PA'LANTE
    const handlePrevStep = () => {
        if (slider.current) {
            // cuando el elemento referenciado (slider) esté disponible/renderizado, haz esto:
            slider.current.scrollBy({
                //scrollBy es un elemento de JS. En este caso le digo que se ponga 265px a la izq EN RELACION de su posicion inicial
                left: -265,
                behavior: 'smooth', //para que el scroll sea suave
            });
        }
    };

    //PA'TRAS
    const handleNextStep = () => {
        if (slider.current) {
            // Desplazar 265 píxeles hacia la derecha
            slider.current.scrollBy({
                left: 265,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className="overflow-hidden">
            <section className="relative flex items-center md:m-8 m-4 space-x-4 h-[220px]">
                <div className="bg-[#FCFF00] rounded-full p-2">
                    <ChevronLeft
                        onClick={handlePrevStep}
                        className="block cursor-pointer w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7 text-black"
                    />
                </div>

                <ul
                    ref={slider}
                    /* sólo a este elemento referenciado le va a afertar el desplazamiento  */
                    className="flex gap-x-8 h-[220px] overflow-x-auto overflow-y-hidden transition-transform duration-300 ease-in-out scroll-smooth no-scroll no-scroll2"
                >
                    {children}
                </ul>

                <div className="bg-[#FCFF00] rounded-full p-2">
                    <ChevronRight
                        onClick={handleNextStep}
                        className="block cursor-pointer w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7 text-black"
                    />
                </div>
            </section>
        </div>
    );
}

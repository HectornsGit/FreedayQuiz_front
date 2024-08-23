//importamos flecha izquierda y flecha derecha
import ChevronLeft from './icons/ChevronLeft';
import ChevronRight from './icons/ChevronRight';

export default function Slider({ children }) {
    const slideLeft = () => {
        const slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft - 265;
    };

    const slideRight = () => {
        const slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft + 265;
    };

    return (
        <>
            <section className="relative flex items-center md:m-8 m-4">
                <ChevronLeft
                    onClick={slideLeft}
                    className=" block cursor-pointer fill-[--yellow] md:w-7 w-3 md:mx-4 mx-2"
                />
                {children}
                <ChevronRight
                    onClick={slideRight}
                    className=" block cursor-pointer fill-[--yellow] md:w-7 w-3 md:mx-4 mx-2"
                />
            </section>
        </>
    );
}

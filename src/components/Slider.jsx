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
            <section className="relative flex items-center md:m-8 m-4 space-x-4">
                <div className="bg-[#FCFF00] rounded-full p-2">
                    <ChevronLeft
                        onClick={slideLeft}
                        className="block cursor-pointer w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7 text-black"
                    />
                </div>
                {children}
                <div className="bg-[#FCFF00] rounded-full p-2">
                    <ChevronRight
                        onClick={slideRight}
                        className="block cursor-pointer w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7 text-black"
                    />
                </div>
            </section>
        </>
    );
}

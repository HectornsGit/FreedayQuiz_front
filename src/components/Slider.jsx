//importamos flecha izquierda y flecha derecha
import ChevronLeft from "./icons/ChevronLeft"
import ChevronRight from "./icons/ChevronRight"

export default function Slider({children}) {

    const slideLeft = () => {
        const slider = document.getElementById('slider')
        slider.scrollLeft = slider.scrollLeft - 300
        console.log('iz');
    }

    const slideRight = () => {
        const slider = document.getElementById('slider')
        slider.scrollLeft = slider.scrollLeft + 300
        console.log('drcha');
    }


    return (
        <>
        <section className='relative flex items-center'>
            <ChevronLeft onClick={slideLeft} className='cursor-pointer fill-[--yellow] w-7 mx-4'/>
                <div id='slider' className='w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth'>
                    { children }
                </div>
            <ChevronRight onClick={slideRight} className='cursor-pointer fill-[--yellow] w-7 mx-4'/>
        </section>
        </>
    );
}
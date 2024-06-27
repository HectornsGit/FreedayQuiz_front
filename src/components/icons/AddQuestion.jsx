export default function AddQuestion() {

    return (
        <div className='w-[200px] h-[126px] md:w-[400px] md:h-[241px] bg-black border-2 border-solid border-[--yellow] rounded cursor-pointer relative md:top-[1.7rem] top-[0px]'>
            <span
                className='bg-[--yellow]
                md:w-12 md:h-12 
                w-9 h-9
                rounded-full 
                md:text-6xl
                text-4xl
                font-bold 
                text-black 
                text-center
                flex
                justify-center
                items-center
                relative
                md:top-[70px]
                top-[25px]
                md:left-[170px]
                left-[80px]
                ' > 
                + 
            </span>
            <p className="text-center relative md:top-[115px] top-[40px] md:text-xl text-base text-[--yellow]">Añadir pregunta</p>
        </div>
    );
    
}

export default function AddQuestion() {
    return (
        <>
            <span
                className="bg-[--yellow]
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
                "
            >
                +
            </span>
            <p className="text-center md:text-xl text-base text-[--yellow]">
                Añadir pregunta
            </p>
        </>
    );
}

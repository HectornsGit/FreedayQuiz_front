//añadimos prop className para poder añadir estilos con Tailwind
export default function ChevronLeft({className, onClick}) {

    return (
        <div onClick={onClick}>
        <svg xmlns="http://www.w3.org/2000/svg"
        className={className} 
        viewBox="0 0 320 512">
            <path 
            d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/>
        </svg>
        </div>
    );
}



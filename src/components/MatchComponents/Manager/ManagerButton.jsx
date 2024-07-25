const ManagerButton = ({
    text,
    handleClick,
    disabled = false,
    isPrimary = false,
}) => {
    return (
        <div className="bg-black mt-4 bg-fixed disabled:bottom-1 h-12 md:w-64 w-48">
            <button
                className={
                    (isPrimary && !disabled
                        ? ' bg-gradient hover:box-shadow-yellow hover:bg-black '
                        : 'bg-white hover:bg-black hover:text-white hover:box-shadow-white ') +
                    'text-black relative bottom-5 box-border font-extrabold text-lg w-full h-12 mx-0  px-2 py-2 mt-5 disabled:bottom-6 disabled:bg-black disabled:box-shadow-gray   disabled:text-gray-600 '
                }
                onClick={handleClick}
                disabled={disabled}
            >
                {text}
            </button>
        </div>
    );
};
export default ManagerButton;
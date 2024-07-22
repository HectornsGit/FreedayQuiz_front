const ManagerButton = ({
    text,
    handleClick,
    disabled = false,
    isPrimary = false,
}) => {
    return (
        <div className="bg-black md:w-64 w-48">
            <button
                className={
                    (isPrimary
                        ? ' bg-gradient hover:box-shadow-yellow hover:bg-black '
                        : 'bg-white hover:bg-black hover:text-white hover:box-shadow-white ') +
                    'text-black  font-extrabold text-lg w-full h-full mx-0  px-2 py-2 mt-5 disabled:bg-black disabled:box-shadow-gray   disabled:text-gray-600 '
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

const ManagerButton = ({
    text,
    handleClick,
    disabled = false,
    isPrimary = false,
}) => {
    return (
        <div className="bg-black bg-fixed disabled:bottom-1 md:h-12 h-10 md:w-56 w-36">
            <button
                className={
                    (isPrimary && !disabled
                        ? ' bg-gradient hover:box-shadow-yellow hover:bg-black '
                        : 'bg-white hover:bg-black hover:text-white hover:box-shadow-white ') +
                    'text-black relative bottom-5 box-border md:font-extrabold font-semibold md:text-md text-sm w-full md:h-12 h-10 mx-0  px-0 py-2 mt-5 disabled:bottom-6 disabled:bg-black disabled:box-shadow-gray   disabled:text-gray-600 '
                }
                onClick={handleClick || null}
                disabled={disabled}
            >
                {isPrimary && !disabled ? (
                    <span className="gradient-text">{text}</span>
                ) : (
                    text
                )}
            </button>
        </div>
    );
};
export default ManagerButton;

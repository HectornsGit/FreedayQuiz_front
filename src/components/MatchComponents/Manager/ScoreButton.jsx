const ScoreButton = ({
    disabled = false,
    handleClick,
    text,
    primary = false,
}) => {
    return (
        <button
            onClick={handleClick}
            disabled={disabled}
            className={
                (primary && !disabled
                    ? 'bg-gradient text-black hover:bg-black  '
                    : 'bg-[--yellow] text-black hover:bg-black hover:text-[--yellow] ') +
                'w-full font-bold text-lg p-2 disabled:text-gray-600 disabled:bg-black'
            }
        >
            {primary && !disabled ? (
                <span className="gradient-text">{text}</span>
            ) : (
                text
            )}
        </button>
    );
};
export default ScoreButton;

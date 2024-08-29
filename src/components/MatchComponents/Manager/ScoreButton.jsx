const ScoreButton = ({ disabled = false, handleClick, text }) => {
    return (
        <button
            onClick={handleClick}
            disabled={disabled}
            className="w-full bg-[--yellow] font-bold text-black text-lg p-2 disabled:text-gray-600 disabled:bg-black"
        >
            {text}
        </button>
    );
};
export default ScoreButton;

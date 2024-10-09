const AccessCodeComponent = ({ quizData }) => {
    return (
        quizData && (
            <div className="flex flex-col items-center">
                <h1 className="text-3xl font-bold">{quizData?.title}</h1>
                <p className="text-lg text-[--yellow]">
                    PIN: {quizData?.access_code}
                </p>
            </div>
        )
    );
};
export default AccessCodeComponent;

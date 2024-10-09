import ManagerButton from './ManagerButton';

const SessionTime = ({ quizData, setSessionTimeHandler }) => {
    return (
        <section>
            {quizData && (
                <div>
                    <h1 className="text-3xl font-bold my-8">
                        {quizData?.title}
                    </h1>
                </div>
            )}
            <form
                className="flex flex-col items-center"
                onSubmit={setSessionTimeHandler}
            >
                <label className="text-xl mb-4" htmlFor="session">
                    Duración máxima de la sesión (en minutos)
                </label>
                <input
                    className='font-semibold  w-11/12 mb-10  p-2  text-black text-md py-2"'
                    type="number"
                    id="session"
                    name="session"
                    required
                />
                <ManagerButton text={'Aceptar'} />
            </form>
        </section>
    );
};
export default SessionTime;

import useRequestResetPassword from '../hooks/useRequestResetPassword';

const ResetPasswordBox = () => {
    const { email, setEmail, handleEmail } = useRequestResetPassword();

    return (
        <div>
            <form
                onSubmit={handleEmail}
                className="flex flex-col justify-center items-center"
            >
                <section className="flex flex-col m-2">
                    <label className="text-lg font-semibold text-left">
                        Email:{' '}
                        <span className="text-[--red] font-semibold">*</span>
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="input-default"
                    />
                </section>
                <div className="flex flex-col items-center mt-10">
                    <button
                        type="submit"
                        className="text-black font-extrabold text-lg bg-white px-11 py-2 
                hover:bg-black transition-colors duration-300 ease-in-out hover:text-white hover:box-shadow-white"
                    >
                        {' '}
                        Recuperar contraseña{' '}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ResetPasswordBox;

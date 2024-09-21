import Link from 'next/link';
import EyeOpen from './icons/EyeOpen'; //icono ojo aberto
import EyeClose from './icons/EyeClose'; //icono ojo cerrado
import useLoginForm from '@/hooks/useLoginForm';

function LoginForm() {
    const {
        handleSubmit,
        showPass,
        setShowPass,
        password,
        setPassword,
        email,
        setEmail,
    } = useLoginForm();
    return (
        <div>
            <form
                className="flex flex-col justify-center items-center"
                onSubmit={handleSubmit}
            >
                <div className="flex flex-col m-2">
                    <label className="text-lg font-semibold text-left">
                        Email:{' '}
                        <span className="text-[--red] font-semibold">*</span>
                    </label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        required
                        className="input-default"
                    />
                </div>
                <div className="flex flex-col m-2">
                    <label className="text-lg font-semibold text-left">
                        Contraseña:{' '}
                        <span className="text-[--red] font-semibold">*</span>
                    </label>
                    <div className="flex items-center">
                        <input
                            type={showPass ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            required
                            className="input-default flex-grow z-10"
                        />
                        {/* Icono de ojo para ver/ocultar texto contraseña */}
                        <div
                            className="-ml-10 cursor-pointer fill-[#111] z-20"
                            onClick={() => setShowPass(!showPass)}
                        >
                            {showPass ? <EyeClose /> : <EyeOpen />}
                        </div>
                    </div>
                    <Link
                        href="/request-resetpassword"
                        className=" mt-2 font-medium text-base underline hover:text-[--yellow]"
                    >
                        He olvidado mi contraseña
                    </Link>
                </div>

                <div className="flex flex-col items-center mt-10">
                    <button
                        type="submit"
                        className="text-black font-extrabold text-lg bg-white px-11 py-2 
                hover:bg-black transition-colors duration-300 ease-in-out hover:text-white hover:box-shadow-white"
                    >
                        {' '}
                        Iniciar sesión{' '}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;

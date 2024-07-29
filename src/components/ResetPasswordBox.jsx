import useResetPassword from '../hooks/useResetPassword';

const ResetPasswordBox = () => {
    const { email, setEmail, handleEmail } = useResetPassword();

    return (
        <div>
            <h2>Restablecer Contraseña</h2>
            <form onSubmit={handleEmail}>
                <label>
                    <span>Correo Electrónico:</span>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">
                    Enviar enlace al correo electrónico
                </button>
            </form>
        </div>
    );
};

export default ResetPasswordBox;

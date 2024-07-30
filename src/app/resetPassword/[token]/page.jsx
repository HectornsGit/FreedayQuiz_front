'use client';
import useResetPassword from '@/hooks/useResetPassword';
function ResetPassword() {
    const { handleSubmit, setNewPassword, newPassword } = useResetPassword();
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Escribe tu nueva contraseña"
                required
            />
            <button type="submit">Reset password</button>
        </form>
    );
}

export default ResetPassword;

'use client';
import useResetPassword from '@/hooks/useResetPassword';
function ResetPassword() {
    const { handleSubmit, setNewPassword, newPassword } = useResetPassword();
    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center"
        >
            <section className="flex flex-col m-2">
                <label className="text-lg font-semibold text-left">
                    Nueva contraseña:{' '}
                    <span className="text-[--red] font-semibold">*</span>
                </label>
                <input
                    type={showPass ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="input-default"
                />
                <div className="flex flex-col items-center mt-10">
                    <button
                        type="submit"
                        className="text-black font-extrabold text-lg bg-white px-11 py-2 
                hover:bg-black transition-colors duration-300 ease-in-out hover:text-white hover:box-shadow-white"
                    >
                        {' '}
                        Cambiar contraseña{' '}
                    </button>
                </div>
            </section>
        </form>
    );
}

export default ResetPassword;

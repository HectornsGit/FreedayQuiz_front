'use client';
import useResetPassword from '@/hooks/useResetPassword';
import { useState } from 'react';
import EyeClose from '@/components/icons/EyeClose';
import EyeOpen from '@/components/icons/EyeOpen';
function ResetPassword() {
    const { handleSubmit, setNewPassword, newPassword } = useResetPassword();
    const [showPass, setShowPass] = useState(false);
    return (
        <div className="h-fit flex flex-col content-center text-center mb-14">
            <h2 className="text-4xl font-extrabold mb-4">Cambiar contraseña</h2>
            <p className="mb-10 text-lg">
                ¡Apunta tu nueva contraseña para que no se te olvide!
            </p>
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
                    <div
                        className="relative left-[11rem] bottom-[2.1rem] fill-[#111]"
                        onClick={() => setShowPass(!showPass)}
                    >
                        {showPass ? <EyeClose /> : <EyeOpen />}
                    </div>
                </section>
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
            </form>
        </div>
    );
}

export default ResetPassword;

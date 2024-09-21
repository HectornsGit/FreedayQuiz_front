/* eslint-disable @next/next/no-img-element */
'use client';
import EyeOpen from './icons/EyeOpen'; //icono ojo aberto
import EyeClose from './icons/EyeClose'; //icono ojo cerrado
import useRegisterForm from '@/hooks/useRegisterForm';

function RegisterForm() {
    const {
        fileInputRef,
        handleSubmit,
        handleAvatarChange,
        showPass,
        setShowPass,
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
        avatarPreview,
    } = useRegisterForm();

    return (
        <>
            <div>
                <form
                    className="flex flex-col justify-center items-center"
                    onSubmit={handleSubmit}
                >
                    {avatarPreview && (
                        <>
                            <div
                                className="mb-1"
                                onClick={() => {
                                    fileInputRef.current.click();
                                }}
                            >
                                <img
                                    src={avatarPreview}
                                    alt="Avatar Preview"
                                    className="w-24 h-24 rounded-full object-cover cursor-pointer"
                                />
                            </div>
                            <span className="bg-[--yellow] w-8 h-8 rounded-full text-black text-center font-bold text-4xl leading-[2rem] relative left-[1.7rem] bottom-[1.9rem] cursor-pointer">
                                {' '}
                                +{' '}
                            </span>
                        </>
                    )}
                    <div className="hidden">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className="hidden"
                            ref={fileInputRef}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-lg font-semibold text-left">
                            Nombre de usuario:{' '}
                            <span className="text-[--red] font-semibold">
                                *
                            </span>
                        </label>
                        <input
                            type="name"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                            required
                            className="input-default"
                        />
                    </div>
                    <div className="flex flex-col mt-8">
                        <label className="text-lg font-semibold text-left">
                            Email:{' '}
                            <span className="text-[--red] font-semibold">
                                *
                            </span>
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            required
                            className="input-default"
                        />
                    </div>
                    <div className="flex flex-col mt-8">
                        <label className="text-lg font-semibold text-left">
                            Contraseña:{' '}
                            <span className="text-[--red] font-semibold">
                                *
                            </span>
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
                    </div>
                    <button
                        className="text-black font-extrabold text-lg bg-gradient px-11 py-2 mt-10  hover:bg-black hover:box-shadow-yellow"
                        type="submit"
                    >
                        <p className="gradient-text">Registrarse</p>
                    </button>
                </form>
            </div>
        </>
    );
}

export default RegisterForm;

'use client';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { fetchAPI } from '@/api/fetch-api';
import { toast } from 'react-toastify';
import EyeOpen from './icons/EyeOpen'; //icono ojo aberto
import EyeClose from './icons/EyeClose'; //icono ojo cerrado

function RegisterForm() {
    const [showPass, setShowPass] = useState(false); //para mostrar o no el texto en el campo contraseña
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(
        'imagenPredeterminada.png'
    );
    const fileInputRef = useRef(null);
    const router = useRouter();

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        setAvatar(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setAvatarPreview(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        if (avatar) {
            formData.append('avatar', avatar);
        }
        console.log('Datos del formulario:', formData);

        const onSuccess = (data) => {
            toast.success('Registrado correctamente');
            setEmail('');
            setName('');
            setPassword('');
            router.push('/register-confirm');
        };

        const onError = (error) => {
            toast.error('Ha habido un error en el registro');
            console.log('Ha habido un error en el registro', error);
            setPassword('');
        };

        fetchAPI('/register', 'POST', formData, onSuccess, onError, null, {
            'Content-Type': 'multipart/form-data',
        });
    };

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
                        <input
                            type={showPass ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            required
                            className="input-default"
                        />
                        {/* Icono de ojo para ver/ocultar texto contraseña */}
                        <div
                            className="relative left-[11rem] bottom-[2.1rem] fill-[#111]"
                            onClick={() => setShowPass(!showPass)}
                        >
                            {showPass ? <EyeClose /> : <EyeOpen />}
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

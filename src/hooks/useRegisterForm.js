import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { fetchAPI } from '@/api/fetch-api';
import { toast } from 'react-toastify';

const useRegisterForm = () => {
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

        const onSuccess = (data) => {
            toast.success('Registrado correctamente');
            setEmail('');
            setName('');
            setPassword('');
            router.push('/register-confirm');
        };

        const onError = (error) => {
            toast.error(error.error);
            console.log('Ha habido un error en el registro', error);
            setPassword('');
        };

        fetchAPI('/register', 'POST', formData, onSuccess, onError, null);
    };
    return {
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
        avatar,
        setAvatar,
        avatarPreview,
        setAvatarPreview,
    };
};
export default useRegisterForm;

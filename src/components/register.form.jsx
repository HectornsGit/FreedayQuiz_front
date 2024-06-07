'use client'
import { useState, useRef } from 'react'
import { fetchAPI } from '@/api/fetch-api'
import { toast } from 'react-toastify'

function RegisterForm() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [avatar, setAvatar] = useState(null)
    const [avatarPreview, setAvatarPreview] = useState(
        'imagenPredeterminada.png'
    )
    const fileInputRef = useRef(null)

    const handleAvatarChange = (e) => {
        const file = e.target.files[0]
        setAvatar(file)
        const reader = new FileReader()
        reader.onloadend = () => {
            setAvatarPreview(reader.result)
        }
        if (file) {
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const payload = { name, email, password, avatar }
        console.log('Datos del formulario:', payload)

        const onSuccess = (data) => {
            toast.success('Registrado correctamente')
            console.log('Registrado correctamente', data)
            setEmail('')
            setName('')
            setPassword('')
        }
        const onError = (error) => {
            toast.error(error.error)
            console.log('Ha habido un error en el registro', error.error)
            setPassword('')
        }
        fetchAPI('/register', 'POST', payload, onSuccess, onError)
    }

    return (
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
                            fileInputRef.current.click()
                        }}
                    >
                        <img
                            src={avatarPreview}
                            alt="Avatar Preview"
                            className="w-24 h-24 rounded-full object-cover cursor-pointer"
                        />
                    </div>
                    <span className='bg-[--yellow] w-8 h-8 rounded-full text-black text-center font-bold text-4xl leading-[2rem] relative left-[1.7rem] bottom-[1.9rem] cursor-pointer' > + </span>
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
                    <label className='text-lg font-semibold text-left'>Nombre de usuario: <span className='text-[--red] font-semibold'>*</span></label>
                    <input
                        type="name"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
                        required
                        className="input-default"
                    />
                </div>
                <div className="flex flex-col mt-8">
                    <label className='text-lg font-semibold text-left'>Email: <span className='text-[--red] font-semibold'>*</span></label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        required
                        className="input-default"
                    />
                </div>
                <div className="flex flex-col mt-8">
                    <label className='text-lg font-semibold text-left'>Contraseña: <span className='text-[--red] font-semibold'>*</span></label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        required
                        className="input-default"
                    />
                </div>
                <button
                    className="text-black font-extrabold text-lg bg-gradient px-11 py-2 mt-10  hover:bg-black hover:box-shadow-yellow"
                    type="submit"
                >
                    Registrarse
                </button>
            </form>
        </div>
    )
}

export default RegisterForm

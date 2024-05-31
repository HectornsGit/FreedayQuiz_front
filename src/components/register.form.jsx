'use client'
import { useState, useRef } from 'react'
import { sendRegister } from '@/api/send-register'

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

        // Enviar los datos del formulario al fetch
        sendRegister(payload)
    }

    return (
        <div>
            <form
                className="flex flex-col justify-center items-center"
                onSubmit={handleSubmit}
            >
                {avatarPreview && (
                    <div
                        className="mb-4"
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
                <div className="flex flex-col items-center">
                    <label>Nombre de usuario:</label>
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
                <div className="flex flex-col items-center mt-2">
                    <label>Email:</label>
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
                <div className="flex flex-col items-center mt-2">
                    <label>Contraseña:</label>
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
                    className="text-black font-extrabold text-lg bg-gradient px-10 py-2 mt-5  hover:bg-black hover:box-shadow-yellow"
                    type="submit"
                >
                    Registrarse
                </button>
            </form>
        </div>
    )
}

export default RegisterForm

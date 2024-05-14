'use client'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerUserService } from '../../services/index'

function RegisterForm() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden')
            return
        }

        try {
            await registerUserService({ name: name, email, password: password })
            navigate('/login')
        } catch (error) {
            setError(error.message)
        }

        console.log('Username:', name)
        console.log('Email:', email)
        console.log('Password:', password)
        console.log('Confirm Password:', confirmPassword)
    }

    return (
        <div>
            <form
                className="flex flex-col justify-center items-center"
                onSubmit={handleSubmit}
            >
                <div className="flex flex-col items-center">
                    <label>Username:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="rounded-lg min-w-64 min-h-7 text-black"
                    />
                </div>
                <div className="flex flex-col items-center mt-2">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="rounded-lg min-w-64 min-h-7 text-black"
                    />
                </div>
                <div className="flex flex-col items-center mt-2">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="rounded-lg min-w-64 min-h-7 text-black"
                    />
                </div>
                <div className="flex flex-col items-center mt-2">
                    <label className="text-base">Confirm Password:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="rounded-lg min-w-64 min-h-7 text-black"
                    />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <button
                    className="px-7 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-900 text-white justify-center items-center text-lg mt-5"
                    type="submit"
                >
                    Register
                </button>
            </form>
        </div>
    )
}

export default RegisterForm

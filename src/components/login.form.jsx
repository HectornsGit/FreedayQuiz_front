import { useState } from 'react'
import { fetchAPI } from '@/api/fetch-api'

import { toast } from 'react-toastify'
import { signIn } from 'next-auth/react'

function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = { email: email, password: password }

        const onSuccess = async (_data) => {
            console.log('Logueado correctamente')
            toast.success('Logueado correctamente')
            setEmail('')
            setPassword('')
            await signIn('credentials', {
                redirect: false,
                email: email,
                password: password,
            })
        }
        const onError = (error) => {
            console.log('Error en el inicio de sesión', error.error)
            toast.error(error.error)
        }
        await fetchAPI('/login', 'POST', payload, onSuccess, onError)
    }

    return (
        <div>
            <form
                className="flex flex-col justify-center items-center"
                onSubmit={handleSubmit}
            >
                <div className="flex flex-col items-center">
                    <label>Email:</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        required
                        className="input-default"
                    />
                </div>
                <div className="flex flex-col items-center mt-2">
                    <label>Contrasela:</label>
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
                    className="px-7 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-900 text-white justify-center items-center text-lg mt-5"
                    type="submit"
                >
                    Login
                </button>
            </form>
        </div>
    )
}

export default LoginForm

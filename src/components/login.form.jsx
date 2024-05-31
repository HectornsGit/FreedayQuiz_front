import { useContext, useState } from 'react'
import { fetchAPI } from '@/api/fetch-api'
import { AuthContext } from '@/context/AuthContextProvider'

function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { token, setToken } = useContext(AuthContext)
    console.log('estado', token)
    console.log(token)

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = { email: email, password: password }
        console.log('Datos del formulario:', payload)

        const data = await fetchAPI('/login', 'POST', payload)
        setToken(data.data.token)
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
                        onChange={handleEmailChange}
                        required
                        className="input-default"
                    />
                </div>
                <div className="flex flex-col items-center mt-2">
                    <label>Contrasela:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
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

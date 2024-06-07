import { useContext, useState } from 'react'
import { fetchAPI } from '@/api/fetch-api'
import Link from 'next/link'
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
                <div className="flex flex-col m-2">
                    <label className='text-lg font-semibold text-left'>Email: <span className='text-[--red] font-semibold'>*</span></label>
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
                <div className="flex flex-col m-2">
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
                    <Link href="/" className=' mt-2 font-medium text-base underline hover:text-[--yellow]'>He olvidado mi contraseña</Link>
                </div>

                <div className="flex flex-col items-center mt-10">
                <button type="submit" className="text-black font-extrabold text-lg bg-white px-11 py-2 
                hover:bg-black hover:text-white hover:box-shadow-white"> Iniciar sesión </button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm

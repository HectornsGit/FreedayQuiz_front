'use client'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContextProvider'
import RegisterForm from '../../components/register.form'


function RegisterPage() {

    const {token} = useContext(AuthContext)
    console.log('Estado del token', token);
    
    const router = useRouter()
    const handleNavigate = (path) =>{
        router.push(path)
    }
    
    if(!token){
        handleNavigate('/')
        console.log('no hay token');
    }


    return (
        <div className="h-fit py-11 flex flex-col justify-center items-center">
            <RegisterForm />
            {/* boton temporal para revisar gestion de token */}
            <button onClick={()=>localStorage.removeItem('token')}  className="px-7 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-900 text-white justify-center items-center text-lg mt-5"
            >Cerrar sesion</button>
        </div>
    )
}

export default RegisterPage

'use client'
import RegisterForm from '../../components/register.form'

function RegisterPage() {
    return (
        <>
            <div className="h-fit flex flex-col content-center text-center mb-14">
            <h2 className='text-4xl font-extrabold mb-4'>¡Regístrate!</h2>
            <p className='mb-10 text-lg w-[250px]'><span className='text-2xl'>😝</span>Regístrate y crea quizes divertidos</p>
                <RegisterForm />
            </div>
        </>
    )
}

export default RegisterPage

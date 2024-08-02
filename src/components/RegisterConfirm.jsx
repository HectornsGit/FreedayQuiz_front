'use client'
import ButtonSecondary from './ButtonSecondary'

function RegisterConfirm() {
    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold">¡Enhorabuena!</h1>
            <p className="mt-4">Te as registrado correctamente, inicia seccion para crear una partida</p>
            <ButtonSecondary href="/login">Iniciar Sesión</ButtonSecondary>
        </div>
    )
}

export default RegisterConfirm

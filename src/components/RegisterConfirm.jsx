'use client'
import ButtonSecondary from './ButtonSecondary'

function RegisterConfirm() {
    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="flex flex-col text-2xl font-bold">¡Enhorabuena!</h1>
            <p className="flex flex-col mt-8 mb-8">Te as registrado correctamente, inicia seccion para crear una partida</p>
            <ButtonSecondary href="/login">Iniciar Sesión</ButtonSecondary>
        </div>
    )
}

export default RegisterConfirm

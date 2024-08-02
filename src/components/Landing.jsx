import React from 'react';
import '../styles/globals.css';

const Landing = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="text-center text-white">
                <h1 className="text-4xl font-bold mb-4">¡Bienvenido/a!</h1>
                <p className="mb-6">
                    Introduce el pin de juego para empezar a jugar
                </p>
                <div className="flex flex-col items-center">
                    <input
                        type="text"
                        placeholder="Pin de juego"
                        className="mb-4 p-2 text-black rounded"
                    />
                    <button
                        className="text-black font-extrabold text-lg bg-gradient px-11 py-2  hover:bg-black hover:box-shadow-yellow">
                            Ingresar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Landing;

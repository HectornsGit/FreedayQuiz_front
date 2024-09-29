'use client';
import useLanding from '@/hooks/useLanding';
import Link from 'next/link';

const Landing = () => {
    const { accessCode, setAccessCode, handleSubmit } = useLanding();
    return (
        <>
            <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg-hab-black)]">
                <div className="text-center -mt-48 mb-10 flex flex-col">
                    <h2 className="lg:text-[6rem] text-[4rem] font-freedayquiz bg-gradient-to-r from-[--cyan] to-[--yellow] inline-block text-transparent bg-clip-text">
                        FREE DAY
                    </h2>
                    <h2 className="lg:-mt-20 lg:text-[9.8rem] -mt-10  text-[6rem] font-freedayquiz bg-gradient-to-r from-[--cyan] to-[--yellow] inline-block text-transparent bg-clip-text">
                        QUIZ!
                    </h2>
                </div>
                <div className="text-center text-white">
                    <h1 className="lg:text-5xl text-4xl font-bold mb-4">
                        ¡Bienvenido/a!
                    </h1>
                    <p className="mb-6">
                        Introduce el pin de juego para empezar a jugar
                    </p>
                    <div className="flex flex-col items-center">
                        <input
                            type="text"
                            placeholder="Pin de juego"
                            className="mb-4 p-2 text-black rounded"
                            value={accessCode}
                            onChange={(e) => setAccessCode(e.target.value)}
                        />
                        <button
                            className="text-black font-extrabold text-lg bg-gradient px-[4.2rem] py-2 hover:bg-black hover:box-shadow-yellow"
                            onClick={handleSubmit}
                        >
                            <p className="gradient-text">Ingresar</p>
                        </button>
                        <span className="mt-6 text-xl">
                            👾{' '}
                            <Link
                                href="/how-to-play"
                                className=" mt-2 font-medium text-base underline hover:text-[--yellow]"
                            >
                                ¡Enséñame cómo se juega!
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Landing;

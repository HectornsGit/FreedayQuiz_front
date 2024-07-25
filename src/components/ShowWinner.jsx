import Trophy from './icons/Trophy';

const ShowWinner = ({winner}) => {

    return (
        <>
        <section className='flex flex-col items-center mb-8'>
        <Trophy className="w-[10rem] mb-4"/>
        <p className='text-xl'>Ganador/a</p>
        <h3 className="text-3xl font-bold">{winner}</h3>
        </section>
        </>
    );
};

export default ShowWinner ;
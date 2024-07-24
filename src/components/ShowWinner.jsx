import Confetti from './icons/Confetti';
import Points from './icons/Points';
import Trophy from './icons/Trophy';

const ShowWinner = ({ playerData }) => {
    
/*ESTO SON UNAS PRUEBAS PARA EL COMPONENETE DE PUNTUACION FINAL*/
//para ordenar por puntuaciones copio el array playerData
const orderedPlayersbyScore = [...playerData].sort((a, b) => b.totalScore - a.totalScore);
const winner = orderedPlayersbyScore.length > 0 ? orderedPlayersbyScore[0].name : ''
console.log('GANADOR', winner);
/*FIN*/

    return (
        <>
        <article className='mx-auto'>
        <section className='flex flex-col items-center mb-8'>
        <Trophy className="w-[10rem] mb-4" style="fill:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500;"/>
        <p className='text-xl'>Ganador/a</p>
        <h3 className="text-3xl font-bold">{winner}</h3>
        </section>
        <ul className="mx-auto max-w-3xl">
        <h3 className="text-xl font-bold py-1">Puntuaciones</h3>
            {orderedPlayersbyScore.map((player) => (
            <li key={player.id} className="my-2 flex justify-between border-b-2 border-white w-[95%]">
                <span>{player.name}</span>  
                <span className="text-xl font-bold text-[yellow] flex flex-row">{player.totalScore}<Points className="w-[15px] mt-2 pl-1"/></span>
            </li>
            ))}
        </ul>
        </article>
        </>
    );
};

export default ShowWinner ;
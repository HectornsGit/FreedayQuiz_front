import ShowWinner from '../../ShowWinner';
import Points from '../../icons/Points';
import Trophy from '../../icons/Trophy';

const ShowScores = ({ orderedPlayersbyScore }) => {

    return (
        <>
            <article className="mx-auto">
                <ul className="mx-auto max-w-3xl">
                    <h3 className="text-xl font-bold py-1">Puntuaciones</h3>
                    {orderedPlayersbyScore.map((player) => (
                        <li
                            key={player.id}
                            className="my-2 flex justify-between border-b-2 border-white w-[95%]"
                        >
                            <span>{player.name}</span>
                            <span className="text-xl font-bold text-[yellow] flex flex-row">
                                {player.totalScore}
                                <Points className="w-[15px] mt-2 pl-1" />
                            </span>
                        </li>
                    ))}
                </ul>
            </article>
        </>
    );
};

export default ShowScores;

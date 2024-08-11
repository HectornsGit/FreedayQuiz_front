import ShowWinner from '../../ShowWinner';
import Points from '../../icons/Points';
import Trophy from '../../icons/Trophy';
import StreakLogo from '@/components/icons/StreakLogo';

const ShowScores = ({ orderedPlayersbyScore }) => {
    return (
        <>
            <article className="mx-auto">
                <ul className="mx-auto">
                    <h3 className="xl:text-4xl text-2xl font-bold pt-4 pb-10">
                        Puntuaciones
                    </h3>
                    {orderedPlayersbyScore.map((player) => (
                        <>
                            <li
                                key={player.id}
                                className="xl:w-[45vw] w-[95vw] my-2 flex items-center justify-between border-b-2 border-white"
                            >
                                <p className="xl:text-2xl text-lg ">
                                    {player.name}
                                </p>
                                <div className="flex xl:gap-x-16 sm:gap-x-14 ">
                                    <span className="font-bold flex flex-row gap-2">
                                        {player.streak}
                                        <StreakLogo
                                            className={'w-4 fill-orange-400 '}
                                        />
                                    </span>

                                    <span className="w-[100px] flex flex-row justify-end xl:text-3xl text-xl font-bold text-[yellow] flex flex-row">
                                        {player.totalScore}
                                        <Points className="xl:w-[25px] w-[15px] mt-2 pl-1" />
                                    </span>
                                </div>
                            </li>
                        </>
                    ))}
                </ul>
            </article>
        </>
    );
};

export default ShowScores;

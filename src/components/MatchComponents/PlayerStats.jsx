import Points from '../icons/Points';
import StreakLogo from '../icons/StreakLogo';
import PersonLogo from '../icons/PersonLogo';
import PersonSlashedLogo from '../icons/PersonSlashedLogo';

const PlayerStats = ({ player }) => {
    const { name, state, totalScore, streak } = player;
    return (
        <ul className="flex w-full pt-2 items-center gap-10">
            <li className="grow">
                <span className="flex gap-2">
                    {state === 'online' ? (
                        <PersonLogo className={'  pb-1 w-5 fill-[#39FF14] '} />
                    ) : (
                        <PersonSlashedLogo
                            className={'  pb-1 w-6 fill-[#FF3284] '}
                        />
                    )}
                    {name}
                </span>
            </li>
            <li className="font-bold">
                <span className="flex gap-2">
                    {streak}
                    <StreakLogo className={'w-4 fill-orange-400 '} />
                </span>
            </li>
            <li className="w-32 text-2xl  font-bold text-end text-[--yellow]">
                <span className="flex justify-end gap-1">
                    {totalScore}
                    <Points className={'w-4 fill mt-2 [--yellow]'} />
                </span>
            </li>
        </ul>
    );
};
export default PlayerStats;

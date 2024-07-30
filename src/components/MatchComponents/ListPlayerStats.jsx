import PlayerStats from './PlayerStats';

const ListPlayerStats = ({ players }) => {
    return (
        <ul className="text-xl px-2">
            {players.map((player) => (
                <li key={player.id} className="border-b flex  justify-end">
                    <PlayerStats player={player}></PlayerStats>
                </li>
            ))}
        </ul>
    );
};
export default ListPlayerStats;

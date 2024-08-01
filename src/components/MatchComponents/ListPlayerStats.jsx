import PlayerStats from './PlayerStats';
const ListPlayerStats = ({ players }) => {
    if (players.length > 0)
        return (
            <ul className="text-xl px-2">
                {players.map((player) => (
                    <li key={player.id} className="border-b flex  justify-end">
                        <PlayerStats player={player}></PlayerStats>
                    </li>
                ))}
            </ul>
        );
    else return <p>No hay jugadores conectados</p>;
};
export default ListPlayerStats;

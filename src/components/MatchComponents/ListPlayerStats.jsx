import PlayerStats from './PlayerStats';
const ListPlayerStats = ({ players }) => {
    if (players.length > 0)
        return (
            <ul className="text-xl px-2 mb-8">
                {players
                    .sort((playerA, playerB) => {
                        if (playerA.totalScore < playerB.totalScore) return +1;
                        if (playerA.totalScore > playerB.totalScore) return -1;
                        else return 0;
                    })
                    .map((player) => (
                        <li
                            key={player.id}
                            className="border-b flex  justify-end"
                        >
                            <PlayerStats player={player}></PlayerStats>
                        </li>
                    ))}
            </ul>
        );
    else return <p>No hay jugadores conectados</p>;
};
export default ListPlayerStats;

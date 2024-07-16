import ClockLogo from './icons/ClockLogo';
const Clock = ({ time }) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return (
        <ul className=" medium flex items-center gap-2">
            <li>
                <ClockLogo
                    className={'pb-1 self-center h-10 fill-[--yellow]'}
                ></ClockLogo>
            </li>
            <li className="text-[--yellow] font-semibold">
                {hours > 0 && `${hours}:`}
                {minutes < 10 ? `0${minutes}` : minutes}:
                {seconds < 10 ? `0${seconds}` : seconds}
            </li>
        </ul>
    );
};

export default Clock;

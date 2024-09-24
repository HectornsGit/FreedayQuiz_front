import { useState } from 'react';
import ClockLogo from './icons/ClockLogo';
import YellowPencil from './icons/YellowPencil';
import UpdateArrows from './icons/UpdateArrows';

const Clock = ({
    time,
    setSessionTimeHandler,
    isClockInput,
    setIsClockInput,
}) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    const [inputTimeValue, setInputTimeValue] = useState(Math.floor(time / 60));

    return isClockInput ? (
        <form
            id="clockForm"
            className="flex w-40 flex-col items-start mb-2 "
            onSubmit={setSessionTimeHandler}
        >
            <label className="ml-12 text-lg" htmlFor="session">
                Tiempo sesión
            </label>
            <div className=" flex items-center justify-center">
                <ClockLogo
                    className={'mb-1 h-8  self-center mr-4 fill-[--yellow]'}
                ></ClockLogo>
                <input
                    className="font-semibold p-3 w-20 h-5  text-black text-xl"
                    type="text"
                    id="session"
                    name="session"
                    value={inputTimeValue}
                    required
                    onChange={(e) => {
                        setInputTimeValue(e.target.value);
                    }}
                />
                <button>
                    <UpdateArrows
                        className={'w-6 p-1 bg-[--yellow]'}
                    ></UpdateArrows>
                </button>
            </div>
        </form>
    ) : (
        <ul className="flex items-center gap-3">
            <li className="flex-col items-start">
                <p className="text-xs ml-4 align-top">Tiempo sesión</p>
                <ul className=" medium w-32  flex justify-between items-center gap-2">
                    <li>
                        <ClockLogo
                            className={'mb-1 h-8 fill-[--yellow]'}
                        ></ClockLogo>
                    </li>
                    <li className="text-[--yellow]  justify-self-start grow text-2xl font-semibold">
                        {hours > 0 && `${hours}:`}
                        {minutes < 10 ? `0${minutes}` : minutes}:
                        {seconds < 10 ? `0${seconds}` : seconds}
                    </li>
                </ul>
            </li>
            <li className="self-end">
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        setIsClockInput(true);
                    }}
                >
                    <YellowPencil className={'w-5'} />
                </button>
            </li>
        </ul>
    );
};

export default Clock;

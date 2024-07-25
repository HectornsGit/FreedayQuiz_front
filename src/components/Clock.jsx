import { useEffect, useState } from 'react';
import ClockLogo from './icons/ClockLogo';
import YellowBgSendPlane from './icons/YellowBgSendPlane';
import YellowPencil from './icons/YellowPencil';

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
            className="flex w-60 flex-col items-start mb-2 "
            onSubmit={setSessionTimeHandler}
        >
            <label className="ml-6 text-[10px]" htmlFor="session">
                Tiempo sesión
            </label>
            <div className=" flex items-center justify-center">
                <ClockLogo
                    className={'pb-1 self-center mr-2 h-8 fill-[--yellow]'}
                ></ClockLogo>
                <input
                    className="font-semibold p-1 w-16 h-5  text-black text-md"
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
                    <YellowBgSendPlane
                        className={'w-5 p-1'}
                    ></YellowBgSendPlane>
                </button>
            </div>
        </form>
    ) : (
        <ul className="flex items-center">
            <li className="flex-col items-start">
                <p className="text-xs align-top">Tiempo sesión</p>
                <ul className=" medium w-32  flex justify-between items-center gap-2">
                    <li>
                        <ClockLogo
                            className={'pb-1 h-6 fill-[--yellow]'}
                        ></ClockLogo>
                    </li>
                    <li className="text-[--yellow] text-left justify-self-start grow text-lg font-semibold">
                        {hours > 0 && `${hours}:`}
                        {minutes < 10 ? `0${minutes}` : minutes}:
                        {seconds < 10 ? `0${seconds}` : seconds}
                    </li>
                </ul>
            </li>
            <li className="justify-self-end">
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

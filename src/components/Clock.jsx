import { useState } from 'react';
import ClockLogo from './icons/ClockLogo';
import YellowBgSendPlane from './icons/YellowBgSendPlane';
const Clock = ({ time, setSessionTimeHandler, isInput }) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    const [inputTimeValue, setInputTimeValue] = useState(10);
    return isInput ? (
        <form
            className="flex w-60 flex-col items-start mb-2 "
            onSubmit={setSessionTimeHandler}
        >
            <label className="ml-6 text-[10px]" htmlFor="session">
                Tiempo sesión
            </label>
            <div className=" flex items-center justify-center">
                <ClockLogo
                    className={'pb-1 self-center mr-2 h-6 fill-[--yellow]'}
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
                <button type="submit">
                    <YellowBgSendPlane
                        className={'w-5 p-1'}
                    ></YellowBgSendPlane>
                </button>
            </div>
        </form>
    ) : (
        <div className="flex flex-col ">
            <span className="text-[10px] align-top ml-6">Tiempo sesión</span>
            <ul className=" medium flex items-start gap-2">
                <li>
                    <ClockLogo
                        className={'pb-1 h-6 fill-[--yellow]'}
                    ></ClockLogo>
                </li>
                <li className="text-[--yellow] font-semibold">
                    {hours > 0 && `${hours}:`}
                    {minutes < 10 ? `0${minutes}` : minutes}:
                    {seconds < 10 ? `0${seconds}` : seconds}
                </li>
            </ul>
        </div>
    );
};

export default Clock;

import PersonLogo from '@/components/icons/PersonLogo';

const TimesAnsweredComponent = ({ clickedResponses, response, timeLeft }) => {
    return (
        <div
            className={
                timeLeft > 0
                    ? 'hidden'
                    : '' +
                      ' relative top-[5.5rem] left-[16rem] md:left-[19rem] lg:left-[27rem] xl:left-[29rem] flex items-center gap-1 p-2 w-10 h-10 rounded-full bg-black text-[--yellow]'
            }
        >
            <span>
                <PersonLogo className={'pt-1 w-2 fill-[--yellow]'}></PersonLogo>
            </span>
            <span>
                {(clickedResponses[Object.values(response)[0]] &&
                    clickedResponses[Object.values(response)[0]]) ||
                    0}
            </span>
        </div>
    );
};
export default TimesAnsweredComponent;

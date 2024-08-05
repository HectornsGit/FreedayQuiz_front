import PersonLogo from '@/components/icons/PersonLogo';

const TimesAnsweredComponent = ({ clickedResponses, response, timeLeft }) => {
    return (
        <div
            className={
                timeLeft > 0
                    ? 'hidden'
                    : '' +
                      ' m-0 relative top-6 sm:left-5 left-40 gap-1 bg-black text-[--yellow] flex items-center  p-2 w-10 h-10 rounded-full'
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

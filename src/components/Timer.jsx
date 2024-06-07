export const Timer = ({ timeLeft, bothRolled }) => (
    <div className="timer">
        {!bothRolled ? (<p>Time Left to roll: {timeLeft}s</p>) : (<p>Next turn in: {timeLeft}s</p>)}
    </div>
);
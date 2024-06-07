import React from "react";
import { Timer } from "./Timer";

export const ControlPanel = ({ gameOver, onRoll, diceRolled, onRestart, turn, diceValues, timeLeft }) => (
    <div className="control-panel">
        {!gameOver && (
            <div>
                <div className="button-container">
                {diceRolled.diceA ? (
                    <div>Dice A rolled: {diceValues.diceAvalue}</div>
                ) : (
                    <button className="turn-button" onClick={() => onRoll('diceA')} disabled={diceRolled.diceA}>
                        Roll {turn === 'A' ? 'attack' : 'defense'} Dice
                    </button>
                )}
                {diceRolled.diceB ? (
                    <div>Dice B rolled: {diceValues.diceBvalue}</div>
                ) : (
                    <button className="turn-button" onClick={() => onRoll('diceB')} disabled={diceRolled.diceB}>
                        Roll {turn === 'B' ? 'attack' : 'defense'} Dice
                    </button>
                )}
                </div>
                <Timer timeLeft={timeLeft} bothRolled={diceRolled.diceA && diceRolled.diceB} />
            </div>
        )}
        {gameOver && <button className="restart-button" onClick={onRestart}>Restart Game</button>}
    </div>
);
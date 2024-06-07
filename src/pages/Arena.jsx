import { useState, useEffect } from 'react';
import { useContext } from 'react';
import './Arena.css'; // Import the CSS file for styling
import { PlayerContext } from '../PlayerContext';
import { Timer } from '../components/Timer';
import { GameLog } from '../components/Gamelog';
import { ControlPanel } from '../components/ControlPanel';
import { PlayerCard } from '../components/PlayerCard';


const Arena = () => {
    
    const {player1 , player2} = useContext(PlayerContext);
    
    const [gameState, setGameState] = useState({
        playerA: {
            name:player1.name,
            health: player1.health,
            strength: player1.strength,
            attack: player1.attack,
        },
        playerB: {
            name:player2.name,
            health: player2.health,
            strength: player2.strength,
            attack: player2.attack,
        },
        currentTurn: 'A', // 'A' or 'B'
        gameOver: false,
        messages: [],
        diceRolled: { diceA: false, diceB: false },
        diceValues: { diceAvalue: null, diceBvalue: null },
        
    });

    const [timeLeft, setTimeLeft] = useState(15); // Changed from 'time' and 'settime' to 'timeLeft' and 'setTimeLeft'

    const rollDice = () => Math.floor(Math.random() * 6) + 1;

    useEffect(() => {
        if (gameState.diceRolled.diceA && gameState.diceRolled.diceB) {
            handleAttackTurn();
        }
    }, [gameState.diceRolled]);

    useEffect(() => {
        if (timeLeft === 0 && !gameState.gameOver) {
            if (gameState.diceRolled.diceA && gameState.diceRolled.diceB) {
                setGameState((prevState) => ({
                    ...prevState,
                    currentTurn: gameState.currentTurn === 'A' ? 'B' : 'A',
                    diceValues: { diceAvalue: null, diceBvalue: null },
                    diceRolled: { diceA: false, diceB: false }
                }));
                setTimeLeft(10);
            } else {
                if (!gameState.diceRolled.diceA)
                    handleRoll('diceA');
                if (!gameState.diceRolled.diceB)
                    handleRoll('diceB');
            }
        }
    }, [timeLeft]);

    useEffect(() => {
        if (timeLeft > 0 && !gameState.gameOver) {
            const timerId = setTimeout(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);

            return () => clearTimeout(timerId);
        }
    }, [timeLeft, gameState.gameOver]);

    const handleAttackTurn = () => {
        const attacker = gameState.currentTurn === 'A' ? 'playerA' : 'playerB';
        const defender = gameState.currentTurn === 'A' ? 'playerB' : 'playerA';
        const { diceAvalue, diceBvalue } = gameState.diceValues;

        const attackDamage = gameState[attacker].attack * diceAvalue;
        const defendDamage = gameState[defender].strength * diceBvalue;

        const damageDealt = Math.max(0, attackDamage - defendDamage);
        const newHealth = gameState[defender].health - damageDealt;

        const newMessage = `${gameState[attacker].name} attacked ${gameState[defender].name} for ${damageDealt} damage!`;

        setGameState((prevState) => ({
            ...prevState,
            [defender]: {
                ...prevState[defender],
                health: newHealth,
            },
            messages: [...prevState.messages, newMessage],
        }));

        if (newHealth <= 0) {
            setGameState((prevState) => ({
                ...prevState,
                gameOver: true,
                messages: [...prevState.messages, `${gameState[attacker].name} has been defeated! ${gameState[defender].name} wins!`],
            }));
        }
        
        setTimeLeft(3);
    };

    const handleRoll = (type) => {
        const diceValue = rollDice();
        setGameState((prevState) => ({
            ...prevState,
            diceRolled: { ...prevState.diceRolled, [type]: true },
            diceValues: { ...prevState.diceValues, [type === 'diceA' ? 'diceAvalue' : 'diceBvalue']: diceValue }
        }));
    };

    const setfirstturn=()=>{
        if(gameState.playerA.health<gameState.playerB.health)
            gameState.currentTurn='A';
        else
            gameState.currentTurn='B';
    }

    const handleRestart = () => {
        const randomAttack = () => Math.floor(Math.random() * 6)+1; // Random value between 1 and 7
        const randomDefence = () => Math.floor(Math.random() * 6)+1; // Random value between 1 and 7
        const randomHealth = () => Math.floor(Math.random() * 100)+1;
        setGameState((prevState)=>({...prevState,
            playerA: {
                name: player1.name,
                health: randomHealth(),
                strength: randomDefence(),
                attack: randomAttack(),
            },
            playerB: {
                name: player2.name,
                health: randomHealth(),
                strength: randomDefence(),
                attack: randomAttack(),
            },
            currentTurn: 'A', // 'A' or 'B'
            gameOver: false,
            messages: [],

        }));
        setfirstturn();
        setTimeLeft(3);
    };
    useEffect(()=>{
        setfirstturn();
    },[])
    
    
    const attacker = gameState.currentTurn === 'A' ? 'playerA' : 'playerB';

    return (
        <div className="magical-arena">
            <h1>Magical Arena</h1>
            <div className="player-container">
                <PlayerCard player={gameState.playerA} name={player1.name} role={attacker === 'playerA' ? 'Attacker' : 'Defender'} />
                <PlayerCard player={gameState.playerB} name={player2.name} role={attacker === 'playerB' ? 'Attacker' : 'Defender'} />
            </div>
            <ControlPanel gameOver={gameState.gameOver} onRoll={handleRoll} diceRolled={gameState.diceRolled} diceValues={gameState.diceValues} onRestart={handleRestart} turn={gameState.currentTurn} timeLeft={timeLeft} />
            <GameLog messages={gameState.messages} />
        </div>
    );
};

export default Arena;

import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Arena.css"; // Import the CSS file for styling
import { PlayerContext } from "../PlayerContext";
import { Timer } from "../components/Timer";
import { GameLog } from "../components/Gamelog";
import { ControlPanel } from "../components/ControlPanel";
import { PlayerCard } from "../components/PlayerCard";

const Arena = () => {
  const { player1, player2 } = useContext(PlayerContext);
  const navigate = useNavigate();

  // Redirect to home page if player1's name is empty
  useEffect(() => {
    if (!player1.name) {
      navigate("/");
    }
  }, [player1, navigate]);

  // Initialize game state
  const [gameState, setGameState] = useState({
    playerA: {
      name: player1.name ,
      health: player1.health,
      strength: player1.strength,
      attack: player1.attack,
    },
    playerB: {
      name: player2.name ,
      health: player2.health,
      strength: player2.strength,
      attack: player2.attack,
    },
    currentTurn: player1.health > player2.health ? "B" : "A", // 'A' or 'B'
    gameOver: false,
    messages: [],
    diceRolled: { diceA: false, diceB: false },
    diceValues: { diceAvalue: null, diceBvalue: null },
  });

  // Timer state
  const [timeLeft, setTimeLeft] = useState(15); // Changed from 'time' and 'settime' to 'timeLeft' and 'setTimeLeft'

  // Function to roll a dice and get a value between 1 and 6
  const rollDice = () => Math.floor(Math.random() * 6) + 1;

  // Handle attack turn if both dice have been rolled
  useEffect(() => {
    if (gameState.diceRolled.diceA && gameState.diceRolled.diceB) {
      handleAttackTurn();
    }
  }, [gameState.diceRolled]);

  // Handle timer countdown and dice rolls
  useEffect(() => {
    if (timeLeft === 0 && !gameState.gameOver) {
      if (gameState.diceRolled.diceA && gameState.diceRolled.diceB) {
        setGameState((prevState) => ({
          ...prevState,
          currentTurn: gameState.currentTurn === "A" ? "B" : "A",
          diceValues: { diceAvalue: null, diceBvalue: null },
          diceRolled: { diceA: false, diceB: false },
        }));
        setTimeLeft(10);
      } else {
        if (!gameState.diceRolled.diceA) handleRoll("diceA");
        if (!gameState.diceRolled.diceB) handleRoll("diceB");
      }
    }
  }, [timeLeft]);

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0 && !gameState.gameOver) {
      const timerId = setTimeout(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearTimeout(timerId);
    }
  }, [timeLeft, gameState.gameOver]);

  // Handle attack turn logic
  const handleAttackTurn = () => {
    const attacker = gameState.currentTurn === "A" ? "playerA" : "playerB";
    const defender = gameState.currentTurn === "A" ? "playerB" : "playerA";
    const attackerMultiplier =
      gameState.currentTurn === "A"
        ? gameState.diceValues.diceAvalue
        : gameState.diceValues.diceBvalue;
    const defenderMultiplier =
      gameState.currentTurn === "A"
        ? gameState.diceValues.diceBvalue
        : gameState.diceValues.diceAvalue;

    const attackDamage = gameState[attacker].attack * attackerMultiplier;
    const defendDamage = gameState[defender].strength * defenderMultiplier;

    const damageDealt = Math.max(0, attackDamage - defendDamage);
    const newHealth = Math.max(0, gameState[defender].health - damageDealt);

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
        messages: [
          ...prevState.messages,
          `${gameState[defender].name} has been defeated! ${gameState[attacker].name} wins!`,
        ],
      }));
    }

    setTimeLeft(3);
  };

  // Handle dice roll logic
  const handleRoll = (type) => {
    const diceValue = rollDice();
    setGameState((prevState) => ({
      ...prevState,
      diceValues: {
        ...prevState.diceValues,
        [type === "diceA" ? "diceAvalue" : "diceBvalue"]: diceValue,
      },
      diceRolled: { ...prevState.diceRolled, [type]: true },
    }));
  };

  // Handle restart logic
  const handleRestart = () => {
    const randomAttack = () => Math.floor(Math.random() * 6) + 1; // Random value between 1 and 6
    const randomDefence = () => Math.floor(Math.random() * 6) + 1; // Random value between 1 and 6
    const randomHealth = () => Math.floor(Math.random() * 100) + 1;
    const p1health = randomHealth();
    const p2health = randomHealth();
    setGameState((prevState) => ({
      ...prevState,
      playerA: {
        name: player1.name,
        health: p1health,
        strength: randomDefence(),
        attack: randomAttack(),
      },
      playerB: {
        name: player2.name,
        health: p2health,
        strength: randomDefence(),
        attack: randomAttack(),
      },
      currentTurn: p1health > p2health ? "B" : "A", // 'A' or 'B'
      gameOver: false,
      messages: [],
      diceValues: { diceAvalue: null, diceBvalue: null },
      diceRolled: { diceA: false, diceB: false },
    }));

    setTimeLeft(15);
  };

  // Helper function to determine attacker's role
  const attacker = gameState.currentTurn === "A" ? "playerA" : "playerB";

  // Render the Arena component
  return (
    <div className="magical-arena">
      <h1>Magical Arena</h1>
      <div className="player-container">
        <PlayerCard
          player={gameState.playerA}
          name={player1.name}
          role={attacker === "playerA" ? "Attacker" : "Defender"}
        />
        <PlayerCard
          player={gameState.playerB}
          name={player2.name}
          role={attacker === "playerB" ? "Attacker" : "Defender"}
        />
      </div>
      <ControlPanel
        gameOver={gameState.gameOver}
        onRoll={handleRoll}
        diceRolled={gameState.diceRolled}
        diceValues={gameState.diceValues}
        onRestart={handleRestart}
        turn={gameState.currentTurn}
        timeLeft={timeLeft}
      />
      <GameLog messages={gameState.messages} />
    </div>
  );
};

export default Arena;

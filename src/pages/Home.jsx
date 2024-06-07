import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlayerContext } from '../PlayerContext';
import './Home.css'; // Import the CSS file

function Home() {
  const navigate = useNavigate();
  const { player1, player2, setPlayer1, setPlayer2 } = useContext(PlayerContext);

  function handleClick() {
    const randomAttack = () => Math.floor(1 + Math.random() * 7); // Random value between 1 and 7
    const randomDefence = () => Math.floor(1 + Math.random() * 7); // Random value between 1 and 7

    setPlayer1((prev) => ({ ...prev, attack: randomAttack(), defence: randomDefence() }));
    setPlayer2((prev) => ({ ...prev, attack: randomAttack(), defence: randomDefence() }));

    console.log('Player 1:', player1);
    console.log('Player 2:', player2);

    navigate(`/arena`);
  }

  const handlePlayer1Change = (e) => {
    const { value } = e.target;
    setPlayer1((prev) => ({ ...prev, name: value }));
  };

  const handlePlayer2Change = (e) => {
    const { value } = e.target;
    setPlayer2((prev) => ({ ...prev, name: value }));
  };

  return (
    <>
      <h1 className="title">Magical Arena</h1>
      <div className="container">
        <label className="label">Player 1 Name: </label>
        <input
          type="text"
          className="input"
          placeholder="Enter Player Name"
          onChange={handlePlayer1Change}
        />

        <label className="label">Player 2 Name: </label>
        <input
          type="text"
          className="input"
          placeholder="Enter Player Name"
          onChange={handlePlayer2Change}
        />

        <button className="button" onClick={handleClick}>Start</button>
      </div>
    </>
  );
}

export default Home;

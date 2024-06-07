import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlayerContext } from '../PlayerContext';
import './Home.css'; 

function Home() {
  const navigate = useNavigate();
  const { player1, player2, setPlayer1, setPlayer2 } = useContext(PlayerContext);

  function handleClick() {
    const randomAttack = () => Math.floor(Math.random() * 6)+1; // Random value between 1 and 7
    const randomDefence = () => Math.floor(Math.random() * 6)+1; // Random value between 1 and 7
    const randomHealth = () => Math.floor(Math.random() * 100)+1; // Random value between 1 and 100


    setPlayer1((prev) => ({ ...prev, attack: randomAttack(), strength: randomDefence() , health: randomHealth()}));
    setPlayer2((prev) => ({ ...prev, attack: randomAttack(), strength: randomDefence() , health: randomHealth()}));

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
    <div className="body-container">
    <div className="first">
      <div className="heading">
        <h1 className="title">Magical Arena</h1>
      </div>
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
      
      </div>
      <div className="second" >

      </div>
    </div>
  );
}

export default Home;

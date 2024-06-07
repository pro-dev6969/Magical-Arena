import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
function Home() {
    const navigate = useNavigate();

    const [player1 , setPlayer1] = useState("");
    const [player2 , setPlayer2] = useState("");

    function handleClick(){
        const query = new URLSearchParams({
            player1: JSON.stringify(player1),
            player2: JSON.stringify(player2)
          }).toString();
      
          navigate(`/arena?${query}`);
    }
    

  return (
    <>
    <h1>Magical Arena</h1>
    <div className="container">
        <label>Player 1 : </label>
        <input type="text" placeholder="Enter Player Name" onChange={(e)=>{setPlayer1(e.target.value)}}/>
        <label>Player 2 : </label>
        <input type="text" placeholder="Enter Player Name" onChange={(e)=>{setPlayer2(e.target.value)}}/>
        <button onClick={handleClick}>Start</button>
      </div>
      </>
  )
}

export default Home
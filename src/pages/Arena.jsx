import React from 'react'
import { useLocation } from 'react-router-dom'

function Arena() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
  const player1 = JSON.parse(queryParams.get('player1'));
  const player2 = JSON.parse(queryParams.get('player2'));
  return (
    <div>Arena
        <h1>{player1}</h1>
        <h1>{player2}</h1>
    </div>
    
  )
}

export default Arena
import React, { useContext } from 'react'
import { PlayerContext } from '../PlayerContext'

function Arena() {
  
  const {player1 , player2} = useContext(PlayerContext); 
    
  return (
    <div>Arena
        <h1>{player1.name}</h1>
        <p>{player1.attack}</p>
        <p>{player1.defence}</p>
        <h1>{player2.name}</h1>
    </div>
    
  )
}

export default Arena
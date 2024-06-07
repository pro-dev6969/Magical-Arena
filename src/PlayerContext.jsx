
import React, { createContext, useState } from 'react';

const PlayerContext = createContext();

const PlayerProvider = ({ children }) => {
  const [player1, setPlayer1] = useState({ name: "", attack: 0, strength: 0 , health: 0});
  const [player2, setPlayer2] = useState({ name: "", attack: 0, strength: 0 , health: 0});

  return (
    <PlayerContext.Provider value={{ player1, setPlayer1, player2, setPlayer2 }}>
      {children}
    </PlayerContext.Provider>
  );
};

export { PlayerContext, PlayerProvider };

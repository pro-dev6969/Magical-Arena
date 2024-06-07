import React from "react";

export const PlayerCard = ({ player, name, role }) => (
    <div className="player-card">
        <div>
            <h2>{name}</h2>
            <p>Health: <progress value={player.health} max="100"></progress> {player.health}</p>
            <p>Strength: {player.strength}</p>
            <p>Attack: {player.attack}</p>
        </div>
        <h3 className="player-role">{role}</h3>
    </div>
);
import React from "react";

export const GameLog = ({ messages }) => (
    <div className="game-log">
        {messages.map((msg, index) => <p key={index}>{msg}</p>)}
    </div>
);

import React from "react";

const ScoreBoard = ({ players, scores }) => {
  return (
    <div className="scoreboard">
      <div className="player-score">
        <h3>{players.player1.name} ({players.player1.category})</h3>
        <p>Score: {scores.player1}</p>
      </div>
      <div className="player-score">
        <h3>{players.player2.name} ({players.player2.category})</h3>
        <p>Score: {scores.player2}</p>
      </div>
    </div>
  );
};

export default ScoreBoard;
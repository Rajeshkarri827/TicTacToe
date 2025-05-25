import React, { useState } from "react";

const categories = ["Food", "Animals", "Tools", "Sports", "Fantasy"];

const PlayerSetup = ({ onStart }) => {
  const [player1, setPlayer1] = useState({ name: "", category: "Food" });
  const [player2, setPlayer2] = useState({ name: "", category: "Animals" });

  const handleStart = () => {
    if (
      player1.name.trim() &&
      player2.name.trim() &&
      player1.category !== player2.category
    ) {
      onStart({ player1, player2 });
    } else {
      alert("Please enter names and select different categories.");
    }
  };

  return (
    <div className="setup-background">
      <div className="setup-container">
        <h2> Player Setup</h2>
        
        <div className="players-horizontal">
          <div className="player-setup">
            <h3>Player 1</h3>
            <input
              type="text"
              placeholder="Enter Player 1 Name"
              value={player1.name}
              onChange={(e) => setPlayer1({ ...player1, name: e.target.value })}
              className="name-input"
            />
            <select
              value={player1.category}
              onChange={(e) => setPlayer1({ ...player1, category: e.target.value })}
              className="category-select"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="vs-divider">
            <div className="vs-text">VS</div>
          </div>

          <div className="player-setup">
            <h3>Player 2</h3>
            <input
              type="text"
              placeholder="Enter Player 2 Name"
              value={player2.name}
              onChange={(e) => setPlayer2({ ...player2, name: e.target.value })}
              className="name-input"
            />
            <select
              value={player2.category}
              onChange={(e) => setPlayer2({ ...player2, category: e.target.value })}
              className="category-select"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} disabled={cat === player1.category}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button onClick={handleStart} className="start-btn">
           Start Game
        </button>
      </div>
    </div>
  );
};

export default PlayerSetup;


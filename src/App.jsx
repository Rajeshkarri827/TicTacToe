import React, { useState } from "react";
import PlayerSetup from "./components/PlayerSetup";
import GameBoard from "./components/GameBoard";
import "./styles.css";

const App = () => {
  const [players, setPlayers] = useState(null);

  const handleReset = () => {
    setPlayers(null);
  };
return (
  <div className={`app-container ${!players ? "setup-background" : "game-background"}`}>
    <div className="game-title">
      <h1 className="animated-title">
        <span className="title-word">⚡</span>
        <span className="title-word">BLINK</span>
        <span className="title-word">TAC</span>
        <span className="title-word">TOE</span>
        <span className="title-word">⚡</span>
      </h1>
    </div>
    {!players ? (
      <PlayerSetup onStart={(data) => setPlayers(data)} />
    ) : (
      <GameBoard players={players} onBack={handleReset} />
    )}
  </div>
);}

export default App;
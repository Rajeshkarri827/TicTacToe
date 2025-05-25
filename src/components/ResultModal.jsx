import React from "react";

const ResultModal = ({ winnerName, onPlayAgain, onBack }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div style={{ fontSize: "48px", marginBottom: "20px" }}>
          {winnerName === "Draw" ? "🤝" : "🎉"}
        </div>
        <h2>
          {winnerName === "Draw"
            ? "It's a Draw!"
            : `${winnerName} Wins!`}
        </h2>
        <button onClick={onPlayAgain} className="play-again-btn">
          🔁 Play Again
        </button>
        <button onClick={onBack} className="back-btn">
          🏠 Home
        </button>
      </div>
    </div>
  );
};

export default ResultModal;
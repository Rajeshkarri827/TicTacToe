import React, { useState, useEffect, useCallback } from "react";
import Cell from "./Cell";
import ResultModal from "./ResultModal";

const emojiMap = {
  Food: ["🍕", "🍔", "🍟", "🍩", "🍣", "🌮", "🍎", "🍌", "🍓"],
  Animals: ["🐱", "🐶", "🐰", "🦊", "🐯", "🐸", "🐨", "🐼", "🦁"],
  Tools: ["🔨", "🔧", "🪛", "🪓", "⚙️", "🔩", "⛏️", "🛠️", "🔪"],
  Sports: ["⚽", "🏀", "🏈", "🎾", "🏓", "🏐", "🏑", "🎳", "⛳"],
  Fantasy: ["🧙", "🐉", "🧝", "🧞", "🧛", "🦄", "🧚", "🦋", "✨"]
};

const GameBoard = ({ players, onBack }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [history, setHistory] = useState({ player1: [], player2: [] });
  const [usedEmojis, setUsedEmojis] = useState({ player1: [], player2: [] });
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  const [isPlayerOneTurn, setIsPlayerOneTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningPattern, setWinningPattern] = useState([]);
  const [musicEnabled, setMusicEnabled] = useState(true);

  // Function to play sound with better error handling
  const playSound = useCallback((soundFile) => {
    if (!musicEnabled) return;
    
    try {
      const audio = new Audio(soundFile);
      audio.volume = soundFile.includes('beep') ? 0.3 : 0.5;
      
      // Handle audio loading and playing
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log(`Could not play ${soundFile}:`, error.message);
        });
      }
    } catch (error) {
      console.log(`Audio error for ${soundFile}:`, error.message);
    }
  }, [musicEnabled]);

  // Play win sound when winner is found
  useEffect(() => {
    if (winner && winner !== "Draw") {
      playSound("/success.mp3");
    }
  }, [winner, playSound]);

  const currentPlayer = isPlayerOneTurn ? "player1" : "player2";
  const category = players[currentPlayer].category;

  const getNextEmoji = () => {
    const used = usedEmojis[currentPlayer];
    const all = emojiMap[category];
    const remaining = all.filter(e => !used.includes(e));

    let next;
    if (remaining.length === 0) {
      // Reset used emojis when all are used
      next = all[Math.floor(Math.random() * all.length)];
      setUsedEmojis(prev => ({ ...prev, [currentPlayer]: [next] }));
    } else {
      next = remaining[Math.floor(Math.random() * remaining.length)];
      setUsedEmojis(prev => ({
        ...prev,
        [currentPlayer]: [...prev[currentPlayer], next]
      }));
    }
    return next;
  };

  const handleClick = (index) => {
    if (board[index] || winner) return;

    // Play click sound
    playSound("/beepsound.mp3");

    const newBoard = [...board];
    const playerMoves = [...history[currentPlayer]];

    if (playerMoves.length >= 3) {
      const oldest = playerMoves.shift();
      newBoard[oldest] = null;
    }

    const emoji = getNextEmoji();
    newBoard[index] = { player: currentPlayer, emoji };
    playerMoves.push(index);

    setBoard(newBoard);
    setHistory(prev => ({ ...prev, [currentPlayer]: playerMoves }));

    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    const winnerPattern = winPatterns.find(pattern =>
      pattern.every(i => newBoard[i]?.player === currentPlayer)
    );

    if (winnerPattern) {
      setWinner(players[currentPlayer].name);
      setWinningPattern(winnerPattern);
      setScores(prev => ({
        ...prev,
        [currentPlayer]: prev[currentPlayer] + 1
      }));
    } else if (newBoard.every(cell => cell !== null)) {
      setWinner("Draw");
    } else {
      setIsPlayerOneTurn(!isPlayerOneTurn);
    }
  };

  const restart = () => {
    setBoard(Array(9).fill(null));
    setHistory({ player1: [], player2: [] });
    setUsedEmojis({ player1: [], player2: [] });
    setWinner(null);
    setWinningPattern([]);
    setIsPlayerOneTurn(true);
  };

  return (
    <div className="game-background">
      {/* Player 1 Info - Top Left */}
      <div className="player-info top-left">
        <h3>🎯 {players.player1.name}</h3>
        <p className="score">Score: {scores.player1}</p>
        <p className="category">({players.player1.category})</p>
      </div>

      {/* Player 2 Info - Top Right */}
      <div className="player-info top-right">
        <h3>🎯 {players.player2.name}</h3>
        <p className="score">Score: {scores.player2}</p>
        <p className="category">({players.player2.category})</p>
      </div>

      {/* Top Controls - Center */}
      <div className="top-controls">
        <button onClick={onBack} className="home-btn">
          🏠 Home
        </button>
        <button onClick={restart} className="restart-btn">
          🔁 Restart
        </button>
        <button 
          onClick={() => setMusicEnabled(!musicEnabled)} 
          className="music-btn"
          title={musicEnabled ? "Turn Sound Off" : "Turn Sound On"}
        >
          {musicEnabled ? "🔊" : "🔇"}
        </button>
      </div>

      {/* Current Turn Indicator */}
      <div className="current-turn">
        <h3>🎮 Current Turn: {players[currentPlayer].name}</h3>
      </div>

      {/* Game Board */}
      <div className="board">
        {board.map((cell, i) => (
          <Cell
            key={i}
            value={cell?.emoji}
            onClick={() => handleClick(i)}
            disabled={!!winner}
            highlight={winningPattern.includes(i)}
          />
        ))}
      </div>

      {winner && (
        <ResultModal winnerName={winner} onPlayAgain={restart} onBack={onBack} />
      )}
    </div>
  );
};

export default GameBoard;
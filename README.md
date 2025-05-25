Emoji Tic-Tac-Toe Game
A fun, interactive two-player emoji tic-tac-toe game built with React. Players select different emoji categories and try to get three in a row on a 3x3 board. Each player uses emojis from their chosen category, and the game includes sound effects and score tracking.

Features
Two players compete by placing emojis on a 3x3 grid.

Each player selects a unique category of emojis before starting.

Players get up to 3 emojis on the board at a time; placing a new emoji removes the oldest one.

Tracks and displays current scores for both players.

Highlights winning patterns.

Sound effects for clicks and wins with option to toggle sound on/off.

Result modal displays winner or draw with options to restart or return home.

Responsive and user-friendly UI.

Components Overview
1. PlayerSetup
Allows players to enter their names.

Each player selects a distinct emoji category.

Starts the game once valid inputs are provided.

2. GameBoard
Main game interface showing the 3x3 emoji grid.

Manages game state including board, history of moves, scores, and current turn.

Handles player moves, emoji selection logic, win detection, and sounds.

Displays current player turn and scores.

Provides controls for restarting the game, toggling sound, and returning home.

3. Cell
Represents each cell on the game board.

Displays the emoji if the cell is occupied.

Shows visual feedback on click and highlights winning cells.

4. ResultModal
Displays the result when a game ends (win or draw).

Provides buttons to play again or return home.

5. ScoreBoard (optional if used)
Shows player names, categories, and current scores.

Emoji Categories Used
The game supports 5 distinct emoji categories for players to choose from:

Category	Emojis
Food	🍕, 🍔, 🍟, 🍩, 🍣, 🌮, 🍎, 🍌, 🍓
Animals	🐱, 🐶, 🐰, 🦊, 🐯, 🐸, 🐨, 🐼, 🦁
Tools	🔨, 🔧, 🪛, 🪓, ⚙️, 🔩, ⛏️, 🛠️, 🔪
Sports	⚽, 🏀, 🏈, 🎾, 🏓, 🏐, 🏑, 🎳, ⛳
Fantasy	🧙, 🐉, 🧝, 🧞, 🧛, 🦄, 🧚, 🦋, ✨

How to Play
Both players enter their names and select different emoji categories.

Click Start Game to begin.

Players alternate turns clicking on empty cells to place emojis.

Each player’s emoji comes from their chosen category, randomly selected but not repeated until all emojis are used.

Players can have a maximum of 3 emojis on the board at a time. Placing a 4th emoji removes the oldest one.

Get three emojis in a row (horizontal, vertical, or diagonal) to win.

The score updates automatically and the winner is announced.

Players can restart or return home to setup a new game.

Toggle sound effects on/off using the speaker button.

Sound Effects
Click sound plays on each valid move.

Success sound plays when a player wins.

Sound can be toggled on/off using the speaker icon.

Tech Stack
React with functional components and hooks (useState, useEffect, useCallback).

CSS for styling (assumed, not included here).

Audio API for sound effects.

Installation & Running
Clone the repository.

Install dependencies:



npm install
Run the app:


npm start
Open http://localhost:3000 to play in your browser.


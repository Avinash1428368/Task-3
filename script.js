const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");
let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // columns
  [0, 4, 8],
  [2, 4, 6], // diagonals
];

function handleClick(e) {
  const index = e.target.dataset.index;

  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add(currentPlayer); // Add X or O class for coloring

  if (checkWinner()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    highlightWinningCells();
    gameActive = false;
  } else if (!board.includes("")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  return winPatterns.some((pattern) => {
    return pattern.every((index) => board[index] === currentPlayer);
  });
}

function highlightWinningCells() {
  const winningPattern = winPatterns.find((pattern) =>
    pattern.every((index) => board[index] === currentPlayer)
  );

  winningPattern.forEach((index) => {
    cells[index].classList.add("win-cell");
  });
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("win-cell", "X", "O");
  });
}

cells.forEach((cell) => cell.addEventListener("click", handleClick));
restartBtn.addEventListener("click", restartGame);
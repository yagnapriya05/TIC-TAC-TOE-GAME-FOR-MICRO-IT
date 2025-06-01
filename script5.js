const cells = document.querySelectorAll('[data-cell]');
const game = document.getElementById('game');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restartBtn');

let currentPlayer = 'x';
let isGameOver = false;

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function startGame() {
  cells.forEach(cell => {
    cell.classList.remove('x', 'o');
    cell.textContent = '';
    cell.addEventListener('click', handleClick, { once: true });
  });
  message.textContent = '';
  currentPlayer = 'x';
  isGameOver = false;
}

function handleClick(e) {
  const cell = e.target;
  if (isGameOver) return;

  cell.classList.add(currentPlayer);
  cell.textContent = currentPlayer.toUpperCase();

  if (checkWin(currentPlayer)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
  }
}

function checkWin(player) {
  return winningCombos.some(combo => {
    return combo.every(index => {
      return cells[index].classList.contains(player);
    });
  });
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains('x') || cell.classList.contains('o');
  });
}

function endGame(draw) {
  isGameOver = true;
  if (draw) {
    message.textContent = "It's a Draw!";
  } else {
    message.textContent = `${currentPlayer.toUpperCase()} Wins!`;
  }
}

restartBtn.addEventListener('click', startGame);

startGame();

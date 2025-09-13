// Fungsi untuk menghasilkan papan Sudoku kosong
export const createEmptyBoard = () => {
  return Array(9).fill().map(() => Array(9).fill(0));
};

// Fungsi untuk memeriksa kevalidan penempatan angka
export const isValid = (board, row, col, num) => {
  // Periksa baris
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num) return false;
  }

  // Periksa kolom
  for (let x = 0; x < 9; x++) {
    if (board[x][col] === num) return false;
  }

  // Periksa kotak 3x3
  let startRow = row - row % 3;
  let startCol = col - col % 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i + startRow][j + startCol] === num) return false;
    }
  }

  return true;
};

// Fungsi solver menggunakan backtracking
export const solveSudoku = (board) => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num;
            
            if (solveSudoku(board)) {
              return true;
            }
            
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
};

// Fungsi untuk menghasilkan puzzle Sudoku berdasarkan tingkat kesulitan
export const generateSudoku = (difficulty) => {
  const board = createEmptyBoard();
  solveSudoku(board);
  
  // Tentukan jumlah sel yang akan dihapus berdasarkan tingkat kesulitan
  let cellsToRemove;
  switch(difficulty) {
    case 'easy':
      cellsToRemove = 30;
      break;
    case 'medium':
      cellsToRemove = 40;
      break;
    case 'hard':
      cellsToRemove = 50;
      break;
    default:
      cellsToRemove = 40;
  }
  
  // Buat salinan board untuk puzzle
  const puzzle = board.map(row => [...row]);
  
  // Hapus beberapa angka secara acak
  let removed = 0;
  while (removed < cellsToRemove) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    
    if (puzzle[row][col] !== 0) {
      puzzle[row][col] = 0;
      removed++;
    }
  }
  
  return { puzzle, solution: board };
};
import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import Controls from './components/Controls';
import DifficultySelector from './components/DifficultySelector';
import { generateSudoku } from './algorithms/sudokuGenerator';
import './styles/App.css';

function App() {
  const [puzzle, setPuzzle] = useState(Array(9).fill().map(() => Array(9).fill(0)));
  const [solution, setSolution] = useState(Array(9).fill().map(() => Array(9).fill(0)));
  const [selectedCell, setSelectedCell] = useState(null);
  const [difficulty, setDifficulty] = useState('medium');
  const [errors, setErrors] = useState([]);
  const [gameComplete, setGameComplete] = useState(false);

  // Generate new puzzle when difficulty changes
  useEffect(() => {
    generateNewPuzzle();
  }, [difficulty]);

  const generateNewPuzzle = () => {
    const { puzzle: newPuzzle, solution: newSolution } = generateSudoku(difficulty);
    setPuzzle(newPuzzle);
    setSolution(newSolution);
    setSelectedCell(null);
    setErrors([]);
    setGameComplete(false);
  };

  const handleCellSelect = (row, col) => {
    const isInitial = solution[row][col] === puzzle[row][col];
    if (!isInitial) {
      setSelectedCell({ row, col });
    }
  };

  const handleNumberSelect = (number) => {
    if (selectedCell) {
      const { row, col } = selectedCell;
      const newPuzzle = puzzle.map(r => [...r]); // deep copy

      newPuzzle[row][col] = number;
      setPuzzle(newPuzzle);

      // Jika kosongkan cell
      if (number === 0) {
        setErrors(errors.filter(error => !(error.row === row && error.col === col)));
        return;
      }

      // Validasi error
      if (number !== solution[row][col]) {
        setErrors([...errors, { row, col }]);
      } else {
        setErrors(errors.filter(error => !(error.row === row && error.col === col)));
      }

      // ✅ Cek apakah semua cell sudah benar
      const isComplete = newPuzzle.every((r, rIdx) =>
        r.every((val, cIdx) => val === solution[rIdx][cIdx])
      );

      if (isComplete) {
        setGameComplete(true);
      }
    }
  };

  const handleSolve = () => {
    setPuzzle([...solution]);
    setErrors([]);
    setGameComplete(true);
  };

  const handleHint = () => {
    if (selectedCell) {
      const { row, col } = selectedCell;
      const newPuzzle = puzzle.map(r => [...r]);
      newPuzzle[row][col] = solution[row][col];
      setPuzzle(newPuzzle);

      setErrors(errors.filter(error => !(error.row === row && error.col === col)));

      // Cek lagi apakah sudah selesai
      const isComplete = newPuzzle.every((r, rIdx) =>
        r.every((val, cIdx) => val === solution[rIdx][cIdx])
      );
      if (isComplete) setGameComplete(true);
    }
  };

  const handleCheck = () => {
    const newErrors = [];
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (puzzle[row][col] !== 0 && puzzle[row][col] !== solution[row][col]) {
          newErrors.push({ row, col });
        }
      }
    }
    setErrors(newErrors);
  };

  // ✅ Input lewat keyboard
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedCell) return;

      if (e.key >= "1" && e.key <= "9") {
        handleNumberSelect(parseInt(e.key));
      }
      if (e.key === "Backspace" || e.key === "Delete" || e.key === "0") {
        handleNumberSelect(0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedCell, puzzle, errors]);

  return (
    <div className="App">
      <header className="app-header">
        <h1>Sudoku Solver & Generator</h1>
        <DifficultySelector 
          difficulty={difficulty} 
          onDifficultyChange={setDifficulty} 
        />
      </header>
      <main className="app-main">
        <Board 
          puzzle={puzzle} 
          selectedCell={selectedCell} 
          errors={errors}
          onCellSelect={handleCellSelect} 
        />
        <Controls 
          onNumberSelect={handleNumberSelect}
          onSolve={handleSolve}
          onHint={handleHint}
          onNewGame={generateNewPuzzle}
          onCheck={handleCheck}
        />
      </main>

      {/* ✅ Popup cantik */}
      {gameComplete && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>🎉 Selamat!</h2>
            <p>Kamu berhasil menyelesaikan Sudoku!</p>
            <button className="close-btn" onClick={() => setGameComplete(false)}>
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

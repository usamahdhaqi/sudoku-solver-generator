import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import Controls from './components/Controls';
import DifficultySelector from './components/DifficultySelector';
import { generateSudoku, solveSudoku, isValid } from './algorithms/sudokuGenerator';
import './styles/App.css';

function App() {
  const [puzzle, setPuzzle] = useState(Array(9).fill().map(() => Array(9).fill(0)));
  const [solution, setSolution] = useState(Array(9).fill().map(() => Array(9).fill(0)));
  const [selectedCell, setSelectedCell] = useState(null);
  const [difficulty, setDifficulty] = useState('medium');
  const [errors, setErrors] = useState([]);

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
  };

  const handleCellSelect = (row, col) => {
    // Only allow selection of empty cells
    if (puzzle[row][col] === 0) {
      setSelectedCell({ row, col });
    }
  };

  const handleNumberSelect = (number) => {
    if (selectedCell) {
      const { row, col } = selectedCell;
      const newPuzzle = [...puzzle];
      newPuzzle[row][col] = number;
      setPuzzle(newPuzzle);
      
      // Check if the move is valid
      if (number !== solution[row][col]) {
        setErrors([...errors, { row, col }]);
      } else {
        // Remove from errors if it was previously wrong
        setErrors(errors.filter(error => !(error.row === row && error.col === col)));
      }
    }
  };

  const handleSolve = () => {
    setPuzzle([...solution]);
    setErrors([]);
  };

  const handleHint = () => {
    if (selectedCell) {
      const { row, col } = selectedCell;
      const newPuzzle = [...puzzle];
      newPuzzle[row][col] = solution[row][col];
      setPuzzle(newPuzzle);
      
      // Remove from errors if it was previously wrong
      setErrors(errors.filter(error => !(error.row === row && error.col === col)));
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
    </div>
  );
}

export default App;
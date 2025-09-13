import React from 'react';
import Cell from './Cell';
import '../styles/Board.css';

const Board = ({ puzzle, selectedCell, errors, onCellSelect }) => {
  return (
    <div className="board">
      {puzzle.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((cell, colIndex) => {
            const isInitial = puzzle[rowIndex][colIndex] !== 0;
            const isSelected = selectedCell && selectedCell.row === rowIndex && selectedCell.col === colIndex;
            const isError = errors.some(error => error.row === rowIndex && error.col === colIndex);
            
            return (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                value={cell}
                row={rowIndex}
                col={colIndex}
                isInitial={isInitial}
                isSelected={isSelected}
                isError={isError}
                onSelect={onCellSelect}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Board;
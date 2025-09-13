import React from 'react';
import '../styles/Controls.css';

const Controls = ({ 
  onNumberSelect, 
  onSolve, 
  onHint, 
  onNewGame, 
  onCheck 
}) => {
  return (
    <div className="controls">
      <div className="number-buttons">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
          <button 
            key={num} 
            className="number-btn"
            onClick={() => onNumberSelect(num)}
          >
            {num}
          </button>
        ))}
      </div>
      <div className="action-buttons">
        <button className="action-btn hint" onClick={onHint}>Hint</button>
        <button className="action-btn check" onClick={onCheck}>Check</button>
        <button className="action-btn solve" onClick={onSolve}>Solve</button>
        <button className="action-btn new-game" onClick={onNewGame}>New Game</button>
      </div>
    </div>
  );
};

export default Controls;
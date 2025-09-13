import React from 'react';

const DifficultySelector = ({ difficulty, onDifficultyChange }) => {
  return (
    <div className="difficulty-selector">
      <label>Difficulty: </label>
      <select value={difficulty} onChange={(e) => onDifficultyChange(e.target.value)}>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>
  );
};

export default DifficultySelector;
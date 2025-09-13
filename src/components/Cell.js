import React from 'react';
import '../styles/Cell.css';

const Cell = ({ value, row, col, isInitial, isSelected, isError, onSelect }) => {
  const handleClick = () => {
    onSelect(row, col);
  };

  return (
    <div 
      className={`cell ${isInitial ? 'initial' : ''} ${isSelected ? 'selected' : ''} ${isError ? 'error' : ''}`}
      onClick={handleClick}
    >
      {value !== 0 ? value : ''}
    </div>
  );
};

export default Cell;
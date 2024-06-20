import React, { useState, useRef } from 'react';
import './TicTacToe.css';
import circle from '../assets/circle.png';
import cross from '../assets/cross.png';

const initialData = ["", "", "", "", "", "", "", "", ""];

export const TicTacToe = () => {
  const [data, setData] = useState(initialData);
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const titleRef = useRef(null);  // Reference to the title element

  const toggle = (e, num) => {
    if (lock || data[num]) {
      return;
    }
    const newData = [...data];
    if (count % 2 === 0) {
      newData[num] = 'x';
      e.target.innerHTML = `<img src='${cross}' alt='X' />`;
    } else {
      newData[num] = 'o';
      e.target.innerHTML = `<img src='${circle}' alt='O' />`;
    }
    setData(newData);
    setCount(count + 1);
    setTimeout(() => checkWin(newData), 0);
  };

  const checkWin = (data) => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let condition of winConditions) {
      const [a, b, c] = condition;
      if (data[a] && data[a] === data[b] && data[a] === data[c]) {
        setLock(true);
        titleRef.current.textContent = `${data[a].toUpperCase()} wins!`;
        return;
      }
    }

    if (data.every(cell => cell !== "")) {
      setLock(true);
      titleRef.current.textContent = "It's a draw!";
    }
  };

  const resetGame = () => {
    setData(initialData);
    setCount(0);
    setLock(false);
    document.querySelectorAll('.boxes').forEach(box => (box.innerHTML = ""));
    titleRef.current.textContent = "TicTacToe Game React";  // Reset title
  };

  return (
    <div className="container">
      <h1 className="title" ref={titleRef}>TicTacToe Game <span>React</span></h1>
      <div className="board">
        <div className="row">
          <div className="boxes" onClick={(e) => { toggle(e, 0); }}></div>
          <div className="boxes" onClick={(e) => { toggle(e, 1); }}></div>
          <div className="boxes" onClick={(e) => { toggle(e, 2); }}></div>
        </div>
        <div className="row">
          <div className="boxes" onClick={(e) => { toggle(e, 3); }}></div>
          <div className="boxes" onClick={(e) => { toggle(e, 4); }}></div>
          <div className="boxes" onClick={(e) => { toggle(e, 5); }}></div>
        </div>
        <div className="row">
          <div className="boxes" onClick={(e) => { toggle(e, 6); }}></div>
          <div className="boxes" onClick={(e) => { toggle(e, 7); }}></div>
          <div className="boxes" onClick={(e) => { toggle(e, 8); }}></div>
        </div>
      </div>
      <button className="reset" onClick={resetGame}>Reset</button>
    </div>
  );
};

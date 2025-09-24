import React, { useEffect, useState } from "react";
import phrases from "./bingo-phrases.json";
import "./App.css";

const GRID_SIZE = 5;
const FREE_SPACE = "FREE SPACE";
const LIGHT_GREEN = "#b6f5c9";
const GREY_OUT = "#e0e0e0";

function getShuffledPhrases() {
  const phrasesCopy = [...phrases];
  for (let i = phrasesCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [phrasesCopy[i], phrasesCopy[j]] = [phrasesCopy[j], phrasesCopy[i]];
  }
  return phrasesCopy;
}

function getGrid() {
  const shuffled = getShuffledPhrases();
  const grid = [];
  let phraseIdx = 0;
  for (let row = 0; row < GRID_SIZE; row++) {
    const rowArr = [];
    for (let col = 0; col < GRID_SIZE; col++) {
      if (row === 2 && col === 2) {
        rowArr.push(FREE_SPACE);
      } else {
        rowArr.push(shuffled[phraseIdx]);
        phraseIdx++;
      }
    }
    grid.push(rowArr);
  }
  return grid;
}

function checkBingo(selected) {
  const bingoLines = [];
  // Rows
  for (let r = 0; r < GRID_SIZE; r++) {
    if (selected[r].every(Boolean)) bingoLines.push({ type: "row", idx: r });
  }
  // Columns
  for (let c = 0; c < GRID_SIZE; c++) {
    if (selected.map(row => row[c]).every(Boolean)) bingoLines.push({ type: "col", idx: c });
  }
  // Diagonals
  if ([0,1,2,3,4].every(i => selected[i][i])) bingoLines.push({ type: "diag", idx: 0 });
  if ([0,1,2,3,4].every(i => selected[i][4-i])) bingoLines.push({ type: "diag", idx: 1 });

  return bingoLines.length > 0 ? bingoLines : null;
}

function getWinningCells(bingoLines) {
  const cells = [];
  bingoLines.forEach(line => {
    if (line.type === "row") {
      for (let c = 0; c < GRID_SIZE; c++) cells.push([line.idx, c]);
    } else if (line.type === "col") {
      for (let r = 0; r < GRID_SIZE; r++) cells.push([r, line.idx]);
    } else if (line.type === "diag" && line.idx === 0) {
      for (let i = 0; i < GRID_SIZE; i++) cells.push([i, i]);
    } else if (line.type === "diag" && line.idx === 1) {
      for (let i = 0; i < GRID_SIZE; i++) cells.push([i, GRID_SIZE - 1 - i]);
    }
  });
  return cells;
}

export default function App() {
  const [grid, setGrid] = useState(getGrid());
  const [selected, setSelected] = useState(
    Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill(false))
  );
  // Pre-select FREE SPACE
  useEffect(() => {
    setSelected(sel => {
      const copy = sel.map(row => [...row]);
      copy[2][2] = true;
      return copy;
    });
  }, [grid]);

  const bingoLines = checkBingo(selected);
  const winningCells = bingoLines ? getWinningCells(bingoLines) : [];

  function handleClick(r, c) {
    if (bingoLines) return; // No more selection after bingo
    if (selected[r][c]) return;
    setSelected(sel => {
      const copy = sel.map(row => [...row]);
      copy[r][c] = true;
      return copy;
    });
  }

  function isWinningCell(r, c) {
    return winningCells.some(([row, col]) => row === r && col === c);
  }

  function handleRefresh() {
  setGrid(getGrid());
  setSelected(Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill(false)));
    // FREE SPACE will be set by useEffect
  }

  return (
    <div className="bingo-container">
      <div className="refresh-btn-container">
        <button className="refresh-btn" onClick={handleRefresh} aria-label="Refresh Bingo Grid">🔄</button>
      </div>
      <header>
        <div className="dev-download">Dev Download</div>
        <div className={`bingo-title${bingoLines ? " pulsate" : ""}`}>BINGO</div>
      </header>
      <div className="bingo-grid">
        {grid.map((row, r) =>
          <div className="bingo-row" key={r}>
            {row.map((cell, c) => {
              let style = {};
              if (selected[r][c]) style.background = LIGHT_GREEN;
              if (bingoLines && !isWinningCell(r, c)) style.background = GREY_OUT;
              if (isWinningCell(r, c)) style.background = LIGHT_GREEN;
              return (
                <div
                  key={c}
                  className="bingo-cell"
                  style={style}
                  onClick={() => handleClick(r, c)}
                >
                  {cell}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
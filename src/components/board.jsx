import React, { Component } from "react";
import "./board.css";
import Block from "./block";

const cell = {
  val: 0,
  id: 0,
  filled: false,
  soln: 0
};

const K = 30;

function createBoard() {
  let cells = Array(9)
    .fill()
    .map(() => Array(9).fill(0));

  let x = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  console.log("X: ", x);
  for (let i = 0; i < 9; i++) {
    if (i === 0) {
      cells[0] = x;
    } else if (i === 3 || i === 6) {
      cells[i] = circularShift(1, cells[i - 1]);
    } else {
      cells[i] = circularShift(3, cells[i - 1]);
    }
  }

  let soln = [];
  for (let i = 0; i < 9; i++) soln[i] = cells[i].slice();

  //console.log("Cells before:", soln);
  removeKValues(K, cells);
  //console.log("Cells after: ", cells);

  let new_cells = blockize(cells);
  //console.log("New cell: ", new_cells);

  let cells_objs = [[], [], [], [], [], [], [], [], []];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      cells_objs[i].push(JSON.parse(JSON.stringify(cell)));
    }
  }

  for (let x = 0; x < 9; x++) {}
  let z = 0;
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (new_cells[i][j] !== 0) {
        cells_objs[i][j].filled = true;
      }
      cells_objs[i][j].id = z;
      cells_objs[i][j].val = new_cells[i][j];
      cells_objs[i][j].soln = soln[i][j];
      z++;
    }
  }
  console.log("Cell objs: ", cells_objs);

  return cells_objs;
}

function removeKValues(k, arr) {
  let count = k;
  while (count !== 0) {
    let cellId = Math.floor(Math.random() * 81);
    let i = Math.floor(cellId / 9);
    let j = cellId % 9;
    if (j !== 0) j = j - 1;

    if (arr[i][j] !== 0) {
      count--;
      arr[i][j] = 0;
    }
  }
}
function circularShift(d, arr) {
  var array = [...arr];
  for (let i = 0; i < d; i++) {
    let temp;
    let j;
    temp = array[0];
    for (j = 0; j < array.length - 1; j++) {
      array[j] = array[j + 1];
    }
    array[j] = temp;
  }
  return array;
}
function shuffle(arr) {
  var i = arr.length,
    j = 0,
    temp;

  while (--i) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

function blockize(arr) {
  let new_cells = Array(9)
    .fill()
    .map(() => Array(9).fill(0));

  for (let z = 0; z < 9; z++) {
    let x = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (z >= 3 && z <= 5) {
          new_cells[z][x] = arr[i + 3][j + (z % 3) * 3];
        } else if (z >= 6 && z <= 8) {
          new_cells[z][x] = arr[i + 6][j + (z % 3) * 3];
        } else {
          new_cells[z][x] = arr[i][j + z * 3];
        }
        x++;
      }
    }
  }

  return new_cells;
}

class Board extends Component {
  state = {
    currentValue: 0,
    numberfilled: 0,
    win: false
  };

  constructor(props) {
    super(props);
    this.state.cells = createBoard();
    this.state.numberfilled = 81 - K;
  }

  updatedFilled = () => {
    let numberfilled = this.state.numberfilled;
    numberfilled++;
    if (numberfilled >= 81) {
      this.setState({ win: true });
    }
    this.setState({ numberfilled });
    console.log("THIS RAN");
  };

  render() {
    console.log("state: ", this.state);
    return (
      <div>
        <center>
          <h1>Sudoku!</h1>
          {this.state.win ? <h1>You Won!</h1> : ""}
          <div className="grid-container">
            {this.state.cells.map(blocks => (
              <Block
                key={this.state.cells.indexOf(blocks)}
                cells={blocks}
                updatedFilled={this.updatedFilled}
              />
            ))}
          </div>
        </center>
      </div>
    );
  }
}

export default Board;

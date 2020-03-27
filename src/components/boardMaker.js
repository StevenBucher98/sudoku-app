var cell_temp = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0]
];

function checkCell(i, j, num) {
  return (
    unUsedInCol(i, num) &&
    unUsedInRow(j, num) &&
    unUsedInBox(i - (i % 3), j - (j % 3), num)
  );
}
// check in the row for existence
function unUsedInRow(i, num) {
  for (let j = 0; j < 9; j++) if (cell_temp[i][j] === num) return false;
  return true;
}

// check in the row for existence
function unUsedInCol(j, num) {
  for (let i = 0; i < 9; i++) if (cell_temp[i][j] === num) return false;
  return true;
}

function unUsedInBox(rowStart, colStart, num) {
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
      if (cell_temp[rowStart + i][colStart + j] === num) return false;

  return true;
}

function fillBoard(i, j) {
  var n = 9;
  var srn = 3;
  if (j >= n && i < n - 1) {
    i += 1;
    j = 0;
  }
  // If either index is greater or equal to 9 return true
  if (i >= n && j >= n) {
    return true;
  }
  // if i is less than square root of 9
  if (i < srn) {
    if (j < srn) {
      j = srn;
    }
  } else if (i < n - srn) {
    if (j === Math.floor((i / srn) * srn)) {
      j = j + srn;
    }
  } else {
    if (j === n - srn) {
      i = i + 1;
      j = 0;
      if (i >= n) return true;
    }
  }
  for (let num = 1; num <= 9; num++) {
    if (checkCell(i, j, num)) {
      cell_temp[i][j] = num;
      if (fillBoard(i, j + 1)) return true;
      cell_temp[i][j] = 0;
    }
  }
  return false;
}

function fillBox(row, col) {
  var num;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      do {
        num = Math.floor(Math.random() * 9 + 1);
      } while (!unUsedInBox(row, col, num));

      cell_temp[row + i][col + j] = num;
    }
  }
}

// function create_cell(props) {
//   return props.prefilled ? <button>Test</button> : <p>{props.value}</p>;
// }
// var num = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
// for (var i = 0; i < 9; i = i + 3) {
//   fillBox(i, i);
// }

"use strict"

//úkol č. 4

let gamester = 'circle';

let playIcons = document.querySelector ('.herni_plocha');

let icons = document.querySelector ('img');

const chooseSymbol = (event) => {
  if (gamester === 'cross') {
    event.target.classList.add ('board__field--cross');
    event.target.disabled = true;
    playIcons.src = 'obrázkové podklady/circle.svg';
    gamester = 'cirle';
    return;
  } else {
    event.target.classList.add ('board__field--circle');
    playIcons.src = 'obrázkové podklady/cross.svg';
    event.target.disabled = true,
    gamester = 'cross';
    return;
  }
};

playIcons.addEventListener ('click', chooseSymbol);


//úkol č. 5

const boardSize = 10; //10*10
const fields = document.querySelectorAll ('.pole');
const win = 5;
let player = 'circle';

const gameBattle = (event) => {
  const selectedButton = event.target;
  const playerIcon = document.querySelector ('.hraje > img');

  if (player === 'circle') {
    selectedButton.classList.add ('board__field--circle');
    selectedButton.disabled = true;

    if (isWinningMove (selectedButton)) {
      setTimeout (() => {
        const end = confirm (`Vyhrálo kolečko. Spustit novou hru?`);
        if (end) {
          location.reload ();
        }
      }, 300);
    } else {
      player = 'cross';
      playerIcon.setAttribute ('src', 'obrázkové podklady/cross.svg');
    }
  } else if (player === 'cross') {
   selectedButton.classList.add ('board__field--cross')
   selectedButton.disabled = true;
   if (isWinningMove (selectedButton)) {
     setTimeout (() => {
       const end = confirm (`Vyhrál křížek. Spustit novou hru?`);
       if (end) {
         location.reload ();
       }
     }, 300);
   } else {
    player = 'circle';
    playerIcon.setAttribute('src', 'obrázkové podklady/circle.svg');
  }
} else {
  console.log('Error inside function gameBattle');
}
};

const getSymbol = (field) => {
  if (field.classList.contains('board__field--cross')) {
    return 'cross';
  } else if (field.classList.contains('board__field--circle')) {
    return 'circle';
  }
};

const getField = (row, column) => fields[row * boardSize + column];

const getPosition = (field) => {
  let fieldIndex = 0;
  while (fieldIndex < fields.length && field !== fields[fieldIndex]) {
    fieldIndex++;
  }

  return {
    row: Math.floor(fieldIndex / boardSize),
    column: fieldIndex % boardSize,
  };
};

const isWinningMove = (field) => {
  const origin = getPosition(field);
  const symbol = getSymbol(field);

  let i;

  let inRow = 1;
  // Koukni doleva
  i = origin.column;
  while (i > 0 && symbol === getSymbol(getField(origin.row, i - 1))) {
    inRow++;
    i--;
  }

  // Koukni doprava
  i = origin.column;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(origin.row, i + 1))
  ) {
    inRow++;
    i++;
  }

  if (inRow >= win) {
    return true;
  }

  let inColumn = 1;
  // Koukni nahoru
  i = origin.row;
  while (i > 0 && symbol === getSymbol(getField(i - 1, origin.column))) {
    inColumn++;
    i--;
  }

  // Koukni dolu
  i = origin.row;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(i + 1, origin.column))
  ) {
    inColumn++;
    i++;
  }

  if (inColumn >= win) {
    return true;
  }

  // Diagonály

  let y;

  let inDiagonalA = 1;
  // Koukni nahoru vpravo
  i = origin.row;
  y = origin.column;
  while (
    i > 0 &&
    y < boardSize - 1 &&
    symbol === getSymbol(getField(i - 1, y + 1))
  ) {
    inDiagonalA++;
    i--;
    y++;
  }

  // Koukni dolu vlevo
  i = origin.row;
  y = origin.column;
  while (
    i < boardSize - 1 &&
    y > 0 &&
    symbol === getSymbol(getField(i + 1, y - 1))
  ) {
    inDiagonalA++;
    i++;
    y--;
  }

  if (inDiagonalA >= win) {
    return true;
  }

  let inDiagonalB = 1;
  // Koukni nahoru vlevo
  i = origin.row;
  y = origin.column;
  while (i > 0 && y > 0 && symbol === getSymbol(getField(i - 1, y - 1))) {
    inDiagonalB++;
    i--;
    y--;
  }

  // Koukni dolu vpravo
  i = origin.row;
  y = origin.column;
  while (
    i < boardSize - 1 &&
    y < boardSize - 1 &&
    symbol === getSymbol(getField(i + 1, y + 1))
  ) {
    inDiagonalB++;
    i++;
    y++;
  }

  if (inDiagonalB >= win) {
    return true;
  }

  return false;
};

fields.forEach((item) => {
  item.addEventListener('click', gameBattle);
});













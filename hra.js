"use strict"

let hrac = 'circle';

let herniSymboly = document.querySelector ('.herni_plocha');

let ikony = document.querySelector ('img');

const vyberSymbol = (event) => {
  if (hrac === 'cross') {
    event.target.classList.add ('board__field--cross');
    event.target.disabled = true;
    ikony.src = 'obrázkové podklady/circle.svg';
    hrac = 'cirle';
    return;
  } else {
    event.target.classList.add ('board__field--circle');
    ikony.src = 'obrázkové podklady/cross.svg';
    event.target.disabled = true,
    hrac = 'cross';
    return;
  }
};

herniSymboly.addEventListener ('click', vyberSymbol);

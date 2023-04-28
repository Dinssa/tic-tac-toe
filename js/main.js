/*----- constants -----*/
const TILE = {
    '0': '',
    '1': '<span class="material-symbols-outlined" style="font-size : 4vmin; color: var(--strong-cyan)">close</span>',
    '-1': '<span class="material-symbols-outlined" style="font-size : 4vmin; color: var(--bright-orange)">radio_button_unchecked</span>'
  };
  
/*----- state variables -----*/
let board; // array of 7 column arrays
let turn; // 1 or -1 for player 1 or player 2
let winner; // null = no winner; 1 or -1 = winner; 'T' = tie game
  
/*----- cached elements  -----*/
const messageEl = document.getElementById('message');
const resetGameBtn = document.getElementById('reset-game');
  
/*----- event listeners -----*/
// document.getElementById('board').addEventListener('click', handleDrop);
// resetGameBtn.addEventListener('click', init);
  
/*----- functions -----*/
init();

function init() {
    board = [
        [0,0,0], // col 0
        [0,0,0], // col 1
        [0,0,0], // col 2
    ];
    turn = 1;
    winner = null;
    render();
}

// function handleDrop(e){

// }

function render(){
    renderBoard();
    renderMessage();
    renderControls();
}

function renderBoard(){
    board.forEach(function(colArr, colIdx) {
        colArr.forEach(function(cellVal, rowIdx) {
          const cellId = `c${colIdx}r${rowIdx}`;
          const cellEl = document.getElementById(cellId);
          cellEl.innerHTML = TILE[cellVal];
          if (cellVal) cellEl.getElementsByTagName('span')[0].style.fontSize = cellVal === 1 ? '25vmin' : '19vmin';
          cellVal ? cellEl.classList.remove('playable') : cellEl.classList.add('playable');
        });
    });
}

function renderMessage(){
    if (winner === 'T'){
        messageEl.innerText = "It's a Tie";
    } else if (winner) {
        messageEl.innerHTML = `${TILE[winner]} Wins`
    } else {
        messageEl.innerHTML = `${TILE[turn]} 's Turn`
    }
}

function renderControls(){
    resetGameBtn.style.visibility = winner ? 'visible' : 'hidden';
}
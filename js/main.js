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
document.getElementById('board').addEventListener('click', handleDrop);
resetGameBtn.addEventListener('click', init);
  
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

function handleDrop(e){
    colIdx = parseInt(e.target.id.charAt(1));
    rowIdx = parseInt(e.target.id.charAt(3));
    if (isNaN(colIdx) || isNaN(rowIdx) || winner) return;
    board[colIdx][rowIdx] = turn;
    turn *= -1;
    winner = getWinner(colIdx, rowIdx);
    render();
}

function getWinner(colIdx, rowIdx){
    return checkVerticalWin(colIdx, rowIdx) || checkHorizontalWin(colIdx, rowIdx) || checkDiagonalWin(colIdx, rowIdx) || checkTie();
}

function checkVerticalWin(colIdx, rowIdx) {
    const adjCountUp = countAdjacent(colIdx, rowIdx, 0, 1);
    const adjCountDown = countAdjacent(colIdx, rowIdx, 0, -1);
    return (adjCountUp + adjCountDown) === 2 ? board[colIdx][rowIdx] : null;
}

function checkHorizontalWin(colIdx, rowIdx) {
    const adjCountLeft = countAdjacent(colIdx, rowIdx, -1, 0);
    const adjCountRight = countAdjacent(colIdx, rowIdx, 1, 0);
    return (adjCountLeft + adjCountRight) === 2 ? board[colIdx][rowIdx] : null;
}

function checkDiagonalWin(colIdx, rowIdx) {
    // Win direction: "/"
    const adjCountNE = countAdjacent(colIdx, rowIdx, 1, 1);
    const adjCountSW = countAdjacent(colIdx, rowIdx, -1, -1);
    // Win direction: "\"
    const adjCountNW = countAdjacent(colIdx, rowIdx, -1, 1);
    const adjCountSE = countAdjacent(colIdx, rowIdx, 1, -1);
    return (adjCountNE + adjCountSW) === 2 || (adjCountNW + adjCountSE) === 2 ? board[colIdx][rowIdx] : null;
  }

function checkTie(){
    return board.every(col => col.every(cell => cell !== 0)) ? 'T' : null;
}

function countAdjacent(colIdx, rowIdx, colOffset, rowOffset){
    const player = board[colIdx][rowIdx];
    let count = 0;
    colIdx += colOffset;
    rowIdx += rowOffset;
    
    while (
        board[colIdx] !== undefined &&
        board[colIdx][rowIdx] !== undefined &&
        board[colIdx][rowIdx] === player
    ) {
        count++;
        colIdx += colOffset;
        rowIdx += rowOffset;
    }
    return count;
}

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
          cellVal || winner ? cellEl.classList.remove('playable') : cellEl.classList.add('playable');
        });
    });
}

function renderMessage(){
    if (winner === 'T'){
        messageEl.innerText = "It's a Tie";
    } else if (winner) {
        messageEl.innerHTML = `${TILE[winner]} Wins`;
    } else {
        messageEl.innerHTML = `${TILE[turn]} 's Turn`;
    }
}

function renderControls(){
    resetGameBtn.style.visibility = winner ? 'visible' : 'hidden';
}
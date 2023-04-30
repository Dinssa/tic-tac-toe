/*----- constants -----*/
const TILE = {
    null: '',
    '1': '<span class="material-symbols-outlined player cross" style="color: var(--strong-cyan)">close</span>',
    '-1': '<span class="material-symbols-outlined player circle" style="color: var(--bright-orange)">radio_button_unchecked</span>'
  };

const WINNING_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

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
    board = [null,null,null,null,null,null,null,null,null];
    turn = 1;
    winner = null;
    render();
}

function handleDrop(e){
    tileIdx = parseInt(e.target.id.charAt(1));
    if (isNaN(tileIdx) || winner || board[tileIdx]) return;
    console.log(board);
    board[tileIdx] = turn;
    turn *= -1;
    winner = getWinner(tileIdx);
    render();
}

function getWinner(tileIdx){
    return checkCombos(tileIdx) || checkTie();
}

function checkCombos(tileIdx) {
    for (i = 0; i < WINNING_COMBOS.length; i++){
        combo = WINNING_COMBOS[i];
        if (Math.abs(board[combo[0]] + board[combo[1]] + board[combo[2]]) === 3) return board[tileIdx];
    }
}

function checkTie(){
    return board.every(tile => tile !== null) ? 'T' : null;
}

function render(){
    renderBoard();
    renderMessage();
    renderControls();
}

function renderBoard(){
    board.forEach(function(tileVal, tileIdx) {
        const cellId = `t${tileIdx}`;
        const cellEl = document.getElementById(cellId);
        cellEl.innerHTML = TILE[tileVal];
        tileVal || winner ? cellEl.classList.remove('playable') : cellEl.classList.add('playable');
    });
}

function renderMessage(){
    if (winner === null){
        messageEl.innerHTML = `${TILE[turn]} 's Turn`;
    } else if (winner === 'T'){
        messageEl.innerHTML = "<span class='tie'>It's a Tie</span>";
    } else {
        messageEl.innerHTML = `${TILE[winner]} Wins`;
    }
}

function renderControls(){
    resetGameBtn.style.visibility = winner ? 'visible' : 'hidden';
}
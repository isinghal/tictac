/**
 * This program is a boliler plate code for the famous tic tac toe game
 * Here box represents one placeholder for either X or a 0
 * We have a 2D array to represent the arrangement of X or O is a grid
 * 0 -> empty box
 * 1 -> box with X
 * 2 -> box with O
 * 
 * Below are the tasks which needs to be completed
 * Imagine you are playing with Computer so every alternate move should be by Computer
 * X -> player
 * O -> Computer
 * 
 * Winner has to be decided and has to be flashed
 * 
 * Extra points will be given for the Creativity
 * 
 * Use of Google is not encouraged
 * 
 */
let grid = [];
const GRID_LENGTH = 3;
let turn = 'X';
let isWon = 0;
let difficulty = 0;
let cpuSum = 0;
let playerSum = 0;

function prompt(msg) {
    isWon = 1;
    document.getElementById('result').innerHTML = msg;
}

function initializeGrid() {
    grid = [];
    for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH; rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';

    for (let rowIdx = 0; rowIdx < GRID_LENGTH; rowIdx++) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum % 2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if (gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="' + colIdx + '" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    let newValue = 1;
    if (!grid[colIdx][rowIdx] && !isWon) {
        grid[colIdx][rowIdx] = newValue;
        if (checkWin(1)) { //Checking if player won
            prompt('You won');
        } else {
            if (cpuTurn() === -1) {
                prompt('Draw'); //No more Empty Cells
            }
            if (checkWin(2)) { //Checking if CPU won
                prompt('You Lost');
            }
        }
        renderMainGrid();
        addClickHandlers();
    }
}


function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}


function reset() { //Reset grid
    prompt('Tic Tac');
    isWon = 0;
    initializeGrid();
    renderMainGrid();
    addClickHandlers();
}

initializeGrid();
renderMainGrid();
addClickHandlers();

function cpuTurn() { //CPU
    if (difficulty === 1) {// hard CPU
        return playCpuHard();
    } else {  //Easy mode
        return playRandom();
    }

}

function playRandom() {
    for (i = 0; i <= 2; i++) {
        for (j = 0; j <= 2; j++) {
            if (!grid[i][j]) {
                grid[i][j] = 2;
                return (i * 3) + j + 1;
            }
        }
    }
    return -1;
}

function playCpuHard() {
    if (!grid[1][1]) {
        grid[1][1] = 2;
        return 5;
    }
    else {
        return playRandom();
    }


}

function checkWin(value) { //Check Winning
    if (grid[0][0] === value) {
        if (grid[0][1] === value && grid[0][2] === value) {
            return true;
        }
        if (grid[1][0] === value && grid[2][0] === value) {
            return true;
        }
        if (grid[1][1] === value && grid[2][2] === value) {
            return true;
        }
    }
    if (grid[1][1] === value) {
        if (grid[1][0] === value && grid[1][2] === value) {
            return true;
        }
        if (grid[0][1] === value && grid[2][1] === value) {
            return true;
        }
        if (grid[0][2] === value && grid[2][0] === value) {
            return true;
        }
    }
    if (grid[2][2] === value) {
        if (grid[0][2] === value && grid[1][2] === value) {
            return true;
        }
        if (grid[2][0] === value && grid[2][1] === value) {
            return true;
        }
    }
    return false;
}
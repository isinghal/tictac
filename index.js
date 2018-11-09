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

let diagnolCount;
let rowCount;
let columnCount;


function prompt(msg) {
    isWon = 1;
    document.getElementById('result').innerHTML = msg;
}

function initializeGrid() {
    grid = [];
    rowCount = Array.from(Array(2), () => new Array(GRID_LENGTH).fill(0));
    columnCount = Array.from(Array(2), () => new Array(GRID_LENGTH).fill(0));
    diagnolCount = Array.from(Array(2), () => [0, 0]);
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
        if (updateAndCheckWin(0, parseInt(colIdx), parseInt(rowIdx))) { //Checking if player won
            prompt('You won');
        } else {
            let cpuMoves = cpuTurn();
            if (cpuMoves === -1) {
                prompt('Draw'); //No more Empty Cells
            }
            else if (updateAndCheckWin(1, ...cpuMoves)) { //Checking if CPU won
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
    for (i = 0; i < GRID_LENGTH; i++) {
        for (j = 0; j < GRID_LENGTH; j++) {
            if (!grid[i][j]) {
                grid[i][j] = 2;
                return [i, j];
            }
        }
    }
    return -1;
}

function updateAndCheckWin(index, col, row) { //Check Winning
    console.log(index, col, row);
    columnCount[index][col] += 1;
    rowCount[index][row] += 1;
    if (col === row) {
        diagnolCount[index][0] += 1;
    }
    if (col + row === GRID_LENGTH - 1) {
        diagnolCount[index][1] += 1;
    }
    console.log(columnCount, rowCount, JSON.stringify(diagnolCount));
    if (
        columnCount[index][col] === GRID_LENGTH
        ||
        rowCount[index][row] === GRID_LENGTH
        ||
        diagnolCount[index][0] === GRID_LENGTH
        ||
        diagnolCount[index][1] === GRID_LENGTH) {
        return true;
    }
    return false;
}
const board = document.getElementById('board');
const mt = [];
const cells = 10;
let snake = [53, 54, 55];
let snakeLength = snake.length - 1;
let snakeHead = snake[snakeLength];
let id = 0;
let div;

function generateBoard() {
    for (let i = 0; i < cells; ++i) {
        mt.push(cells);
        for (let j = 0; j < cells; ++j) {
            div = document.createElement('div');
            div.setAttribute('id', id);
            mt[i][j] = div;
            if (snake.includes(id)) {
                div.classList.add('snake');
            }
            div.textContent = id;
            ++id;
            board.appendChild(div);
        }
    }  
}

let moveRight = 2;
let moveLeft = 0;
let moveUp = 0;
let moveDOwn = 0;


document.onkeydown = checkKey;

function checkKey(e) {
    if (e.keyCode >= 37 && e.keyCode <= 40) {
        e.preventDefault();
    }
    e = e || window.event;
    if (e.keyCode == '39' && moveRight != 1 && moveLeft != 1) { //right
        if (moveDOwn == 1) {
            snakeHead -= 10;
        }
        ++snakeHead;   
        moveRight = 1;
        moveLeft = 0;
        moveDOwn = 0;
        moveUp = 0;
        moveSnake();
        
    } else if (e.keyCode == '38' && moveRight < 2 && moveUp != 1 && moveDOwn != 1) { //up
        if (moveRight == 1) {
            snakeHead -= 1;
        } else if (moveLeft == 1) {
            snakeHead += 1;
        }
        moveUp = 1;
        moveDOwn = 0;
        moveRight = 0;
        moveLeft = 0;
        moveSnake();
    }
    else if (e.keyCode == '40' && moveRight < 2 && moveDOwn != 1 && moveUp != 1) { //down
        if (moveLeft == 1) {
            snakeHead += 1;
        } else if (moveRight == 1) {
            snakeHead -= 1;
        }
        snakeHead += 10;
        moveDOwn = 1;
        moveUp = 0;
        moveLeft = 0;
        moveRight = 0;
        moveSnake();
    }
    else if (e.keyCode == '37' && moveRight == 0 && moveLeft != 1) { //left
        --snakeHead;
        if (moveDOwn == 1) {
            snakeHead -= 10;
        } 
        moveLeft = 1;
        moveRight = 0;
        moveDOwn = 0;
        moveUp = 0;
        moveSnake();
    } 
}

let snakeMove = 1;

function moveSnake() {
    if (moveRight == 1) {
        let snk = document.getElementById(snakeHead);
        snk.style.backgroundColor = "black";
        let remove = document.getElementById(snakeHead - 3);
        remove.style.backgroundColor = "white";
        ++snakeHead;
        moveInterval();
    } else if (moveLeft == 1) {
        let snk = document.getElementById(snakeHead);
        snk.style.backgroundColor = "black";
        let remove = document.getElementById(snakeHead + 3);
        remove.style.backgroundColor = "white";
        --snakeHead;
        moveInterval();
    } else if (moveDOwn == 1) {
        div = document.getElementById(snakeHead);
        div.style.backgroundColor = "black";
        let remove = document.getElementById(snakeHead - 30);
        remove.style.backgroundColor = "white";
        snakeHead += 10;
        moveInterval();
    } else if (moveUp == 1) {
        div = document.getElementById(snakeHead - 10);
        div.style.backgroundColor = "black";
        let remove = document.getElementById(snakeHead + 20);
        remove.style.backgroundColor = "white";
        snakeHead -= 10;
        moveInterval();
    }
}

let nInterval;
function moveInterval() {
    if (!nInterval) {
        nInterval = setInterval(moveSnake, 1000);
    }
}



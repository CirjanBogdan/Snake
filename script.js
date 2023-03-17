const board = document.getElementById('board');
const width = 290;
const height = 290;
const cell = 10;
let snake = [];
let head;
let food;
let timer;
let foodCounter = 0;
let direction;
let interval = 200;
let gameStart = false;

const snakeImage = document.querySelector("img");
snakeImage.src ="snake.jpg";

addEventListener('DOMContentLoaded', onLoad);
addEventListener('keydown', onKeyDown);

function onLoad() {
    generateSnake(130, 150);
    generateFood(30);
}

function generateSnake(left, top) {
    for (let i = 0; i < 3; ++i) {
        let div = document.createElement('div');
        div.style.left = `${left - cell * i}px`;
        div.style.top = `${top}px`;
        snake.push(div);
        board.appendChild(div);
    }
    head = snake[0];
}

function generateFood() {
    let top = Math.floor(Math.random() * width / cell) * cell;
    let left = Math.floor(Math.random() * width / cell) * cell;
    food = document.createElement('div');
    food.style.top = `${top}px`;
    food.style.left = `${left}px`;
    food.style.backgroundColor = "black";
    board.appendChild(food);
}

function onKeyDown(e) {
    switch (e.key) {
        case 'ArrowRight':
            direction = direction!='l'?'r':direction;
            break;
        case 'ArrowLeft':
            direction = direction!='r'?'l':direction;
            break;
        case 'ArrowUp':
            direction = direction!='d'?'u':direction;
            break;
        case 'ArrowDown':
            direction = direction!='u'?'d':direction;
            break;
    }
    if (gameStart === false && direction === 'r') {
        timer = setInterval(snakeMove, interval);
        gameStart = true;
    }
}

function snakeMove() {
    let l = parseInt(head.style.left);
    let t = parseInt(head.style.top);
    if (direction === 'r') {
        head.style.top = `${t}px`;
        head.style.left = `${l + cell}px`;
    } else if (direction === 'u') {
        head.style.top = `${t - cell}px`;
        head.style.left = `${l}px`;
    } else if (direction === 'd') {
        head.style.top = `${t + cell}px`;
        head.style.left = `${l}px`;
    } else if (direction === 'l') {
        head.style.top = `${t}px`;
        head.style.left = `${l - cell}px`;
    }
    for (let i = 1; i < snake.length; ++i) {
        let tOld = t;
        let lOld = l;
        t = parseInt(snake[i].style.top);
        l = parseInt(snake[i].style.left);
        snake[i].style.top = `${tOld}px`;
        snake[i].style.left = `${lOld}px`;
        checkSnakeCollision(i);
    }
    checkWallCollision()
    checkFoodCollision();
}

function checkSnakeCollision(i) {
    if (head.style.top === snake[i].style.top && head.style.left === snake[i].style.left) {
        alert("You Lost!");
        clearInterval(timer);
    }
}

function checkWallCollision() {
    if (head.style.top === `${-cell}px` || head.style.top === `${width}px` || head.style.left === `${-cell}px` || head.style.left === `${width}px`) {
        alert("You Lost!");
        clearInterval(timer);
    } 
}

function checkFoodCollision() {
    if (head.style.top === food.style.top && head.style.left === food.style.left) {
        snake.push(food);
        ++foodCounter;
        if (foodCounter == 10) {
            interval -= 10;
            clearInterval(timer);
            timer = setInterval(snakeMove, interval);
            foodCounter = 0;
        }
        generateFood();
        checkWin();
    }
}

function checkWin() {
    if (snake.length - 1 === ((width / cell) * (length / cell)) - 1) { 
        clearInterval(timer);
        alert("You WIN!");
    }
}

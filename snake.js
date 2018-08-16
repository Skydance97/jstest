const area = {width: 20, height: 20, cells: []}, snake = {};

function initArea() {
    for (let y = 0; y < area.height; y++) {
        let row = [];
        for (let x = 0; x < area.width; x++) {
            let cell = {};
            cell.element = document.createElement('div');
            document.getElementById('play-area').appendChild(cell.element);
            row.push(cell);
        }
        area.cells.push(row);
    }

    startGame();
    gameLoop();
}

function clearArea() {
    for (let y = 0; y < area.height; y++) {
        for (let x = 0; x < area.width; x++) {
            area.cells[y][x].snake = 0;
            area.cells[y][x].apple = 0;
        }
    }
}

function placeApple() {
    let appleX = Math.floor(Math.random() * area.width);
    let appleY = Math.floor(Math.random() * area.height);
    area.cells[appleY][appleX].apple = 1;
}

function placeSnake() {
    snake.x = Math.floor(Math.random() * area.width);
    snake.y = Math.floor(Math.random() * area.height);
    snake.length = 3;
    snake.direction = 'Up';
}

function startGame() {
    clearArea();
    placeApple();
    placeSnake();
    area.cells[snake.y][snake.x].snake = snake.length;
}

function gameLoop() {
    switch (snake.direction) {
        case 'Up':    snake.y--; break;
        case 'Down':  snake.y++; break;
        case 'Left':  snake.x--; break;
        case 'Right': snake.x++; break;
    }

    if (snake.x < 0 || snake.y < 0 || snake.x >= area.width || snake.y >= area.height) {
        startGame();
    }

    if (area.cells[snake.y][snake.x].snake > 0) {
        startGame();
    }

    if (area.cells[snake.y][snake.x].apple === 1) {
        snake.length++;
        area.cells[snake.y][snake.x].apple = 0;
        placeApple();
    }

    area.cells[snake.y][snake.x].snake = snake.length;

    for (let y = 0; y < area.height; y++) {
        for (let x = 0; x < area.width; x++) {
            let cell = area.cells[y][x];

            if (cell.snake > 0) {
                cell.element.className = 'snake';
                cell.snake -= 1;
            }
            else if (cell.apple === 1) {
                cell.element.className = 'apple';
            }
            else {
                cell.element.className = '';
            }
        }
    }

    setTimeout(gameLoop, 1000 / snake.length);
}

function enterKey(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (snake.direction !== 'Down') {
                snake.direction = 'Up';
            }
            break;
        case 'ArrowDown':
            if (snake.direction !== 'Up') {
                snake.direction = 'Down';
            }
            break;
        case 'ArrowLeft':
            if (snake.direction !== 'Right') {
                snake.direction = 'Left';
            }
            break;
        case 'ArrowRight':
            if (snake.direction !== 'Left') {
                snake.direction = 'Right';
            }
            break;
        default:
            break;
    }

    event.preventDefault();
}
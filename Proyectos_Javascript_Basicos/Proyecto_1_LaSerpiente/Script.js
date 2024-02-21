//Html elementos
const board =document.getElementById('board')
const scoreBoard = document.getElementById('scoreboard')
const startButton = document.getElementById('start')
const gameOverSign = document.getElementById('gameOver')

//Game Settign

const boardSize = 10
const gameSpeed = 100
const squareTypes = {
    emptySquare: 0,
    snakeSquare: 1,
    foodSquare: 2
}

const direcctions={
    ArrowUp:-10,
    ArrowDown: 10,
    ArrowRight: 1,
    ArrowLeft: -1
}

// Game variables

let snake;
let score;
let direcction;
let boardSquares;
let emptySquares;
let moveInterval;

function drawSnake(){
    snake.forEach(square => drawSquare(square, 'snakeSquare'))
}

function drawSquare(square, type){
const  [ row, column] = square.split('')
boardSquares[row][column] = squareTypes[type]
const squareElement = document.getElementById(square)
squareElement.setAttribute('class', `square ${type}`)

if (type === 'emptySquare'){
    emptySquares.push(square)

} else {
    if(emptySquares.indexOf(square) !== -1){
        emptySquares.splice(emptySquares.indexOf(square), 1)
    }
}
}

function addFood(){
    score++;
    updateScore()
    createRandomFood()
}

function gameOver(){
    gameOverSign.style.display = 'block'
    clearInterval(moveInterval)
    startButton.disabled = false
}

function moveSnake(){
    const newSquare = String(
        Number(snake[snake.length -1]) + direcctions[direcction])
    .padStart(2,'0')
    const[row,column] = newSquare.split('')

        if( newSquare < 0 ||
             newSquare >= boardSize * boardSize || 
            (direcction === 'ArrowRight' && column == 0) ||
        (direcction === 'ArrowLeft' && column == 9 ||
         boardSquares[row][column] === squareTypes.snakeSquare) ){
            gameOver()

        } else {
            snake.push(newSquare)
            if(boardSquares[row][column] === squareTypes.foodSquare){
                addFood()
            } else {
                const emptySquare = snake.shift();
                drawSquare(emptySquare, 'emptySquare')
            }
            drawSnake()
        }

        

}

function setDirection(newDirecction){
    direcction = newDirecction
}


function direcctionEvent( key){
    switch (key.code){
        case 'ArrowUp':
            direcction != 'ArrowDown' && setDirection(key.code)
        break
        case 'ArrowDown':
            direcction != 'ArrowUp' && setDirection(key.code)
        break
        case 'ArrowLeft':
            direcction != 'ArrowRight' && setDirection(key.code)
        break
        case 'ArrowRight':
            direcction != 'ArrowLeft' && setDirection(key.code)
        break
                                
    }
}


function createRandomFood(){
     const randomEmptySquare = emptySquares[Math.floor(Math.random() * emptySquares.length)]
        drawSquare(randomEmptySquare, 'foodSquare')
    }


function updateScore(){
    scoreBoard.innerHTML = score
}


function createBoard(){
    boardSquares.forEach(function(row, rowIndex)  {
        row.forEach(function(column,columnIndex) {
            const squareValue = `${rowIndex}${columnIndex}`
            const squareElement = document.createElement('div')
            squareElement.setAttribute('class', 'square emptySquare')
            squareElement.setAttribute('id', squareValue)
            board.appendChild(squareElement)
            emptySquares.push(squareValue)
        })  
    });

}



function setGame() {
    snake = ['00','01', '02', '03']
    score =  snake.length
    direcction = 'ArrowRight'
    boardSquares= Array.from(Array(boardSize),
     () => new Array(boardSize).fill(squareTypes.emptySquare))
    console.log(boardSquares)
    board.innerHTML= '';
    emptySquares = []
    createBoard()

}

function starGame() {
    setGame();
    gameOverSign.style.display = 'none'
    startButton.disabled= true
    drawSnake();
    updateScore();
    createRandomFood();
    document.addEventListener('keydown', direcctionEvent)
    moveInterval = setInterval  (function() {moveSnake()}, gameSpeed)
}
startButton.addEventListener('click', starGame);
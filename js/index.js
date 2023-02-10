//constants
let inputDir = { x: 0, y: 0 };
let speed = 6;
let lastPaintTime = 0;
let snakeArray = [{ x: 13, y: 15 }];
let food = { x: 15, y: 17 };
let snake = 0;
let score = 0;
const gameOver = new Audio("js/gameOver.mp3");
const move = new Audio("js/move.wav");
const eat = new Audio("js/eat.wav");

//Game Functions
function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  // console.log(ctime);
  lastPaintTime = ctime;
  gameEngine();
}

function isCollide(sarr) {
  for (let i = 1; i < sarr.length; i++) {
    if (sarr[i].x === sarr[0].x && sarr[i].y === sarr[0].y) {
      return true;
    }
  }
  if (sarr[0].x <= 0 || sarr[0].x >= 18 || sarr[0].y <= 0 || sarr[0].y >= 18) {
    return true;
  }
  return false;
}

function gameEngine() {
  //Part 1: Updating the snake and food
  if (isCollide(snakeArray)) {
    gameOver.play();
    inputDir = { x: 0, y: 0 };
    alert("Game Over, Press Enter to start the game");
    snakeArray = [{ x: 13, y: 15 }];
    score = 0;
  }

  //If you have eaten the food, regenerate the food and increment the score
  let a = 2;
  let b = 16;
  if (snakeArray[0].y === food.y && snakeArray[0].x === food.x) {
    eat.play();
    snakeArray.unshift({ x: snakeArray[0].x + inputDir.x, y: snakeArray[0].y + inputDir.y });
    food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    score += 1;
  }
  scoreBox.innerHTML = "Score = " + score;

  //Moving the snake
  for (let i = snakeArray.length - 2; i >= 0; i--) {
    snakeArray[i + 1] = { ...snakeArray[i] };
  }
  snakeArray[0].x += inputDir.x;
  snakeArray[0].y += inputDir.y;

  //Part 2: Render the snake and food
  //Display the snake
  board.innerHTML = "";
  snakeArray.forEach((e, index) => {
    // snakeElement = document.createElement("div");
    snakeElement = document.createElement("img");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.src = "./js/head.jpg";
      // snakeElement.style.gridRowStart = e.y;
      // snakeElement.style.gridColumnStart = e.x;
      snakeElement.classList.add("head");
    } else {
      snakeElement.src = "./js/head.png";
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });

  //Display the food
  // foodElement = document.createElement("div");
  foodElement = document.createElement("img");
  foodElement.src = "./js/foo.jpg";
  foodElement.classList.add("food");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  board.appendChild(foodElement);
}
//Main logic starts here
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  // inputDir = { x: 0, y: 1 }; //Start the game
  switch (e.key) {
    case "ArrowUp":
      // console.log("ArrowUp");
      inputDir.x = 0;
      inputDir.y = -1;
      move.play();
      break;

    case "ArrowDown":
      move.play();
      // console.log("ArrowDown");
      inputDir.x = 0;
      inputDir.y = 1;
      break;

    case "ArrowLeft":
      move.play();
      // console.log("ArrowLeft");
      inputDir.x = -1;
      inputDir.y = 0;
      break;
    case "ArrowRight":
      // console.log("ArrowRight");
      move.play();
      inputDir.x = 1;
      inputDir.y = 0;
      break;

    default:
      break;
  }
});

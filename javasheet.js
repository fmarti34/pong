const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const paddleLenght = 350;
const paddlewidth = 40;
const ballRadius = 20;


canvas.width = window.innerWidth - 34;
canvas.height = window.innerHeight - 34;

let player1Y = (canvas.height / 2) - (paddleLenght / 2);
let player2Y = (canvas.height / 2) - (paddleLenght / 2);
const player1X = 130;
const player2X = canvas.width - 130;
var player1HTML = document.getElementById('score1');
var player2HTML = document.getElementById('score2');
let playerScore1 = 0;
let playerScore2 = 0;



var ballX = ((canvas.width / 2) + (ballRadius / 2));
var ballY = canvas.height / 2;
var ballDx = ballDy = 0;
let isBallMoving = false;
let matchStarted = false;

function playerMove(e) {
  const playerSpeed = 75;
  // move ball
  if (!isBallMoving && (e.key == "w" || e.key == "s" ||
                        e.key == "i" || e.key == "k")){
    matchStarted = true;
    moveBall();
  }

  // for player 1
  if (e.key == "w") {
    player1Y -= playerSpeed;

    if (player1Y <= 0)
      player1Y = 0;
  }
  if (e.key == "s") {
    player1Y += playerSpeed;

    if(player1Y >= canvas.height - paddleLenght)
      player1Y = canvas.height - paddleLenght;
  }

  // for player 2
  if (e.key == "i") {
    player2Y -= playerSpeed;

    if (player2Y <= 0)
      player2Y = 0;
  }
  if (e.key == "k") {
    player2Y += playerSpeed;

    if(player2Y >= canvas.height - paddleLenght)
      player2Y = canvas.height - paddleLenght;
  }
}

function moveBall() {
  if(!isBallMoving && matchStarted){
    isBallMoving = true;
    ballDx = Math.floor((Math.random() * 10) + 20);
    ballDy = Math.floor((Math.random() * 5) + 10);
    if (ballDx % 2 == 0)
      ballDx = -ballDx;
    if (ballDy % 2 == 0)
      ballDy = -ballDy
  }
  ballX += ballDx;
  ballY += ballDy;

  //check if ball hits player 1
  if (((ballX - ballRadius) + ballDx >= player1X && (ballX - ballRadius) + ballDx <= player1X + paddlewidth) &&
  ballY >= player1Y && ballY <= player1Y + paddleLenght) {

    ballDx = (ballDx * -1) + (Math.random() * 5) + 3;
    ballDy = (ballDy * - 1) + (Math.random() * 10) + 4;
  }

  //check if ball hits player 2
  if ((ballX + ballRadius + ballDx >= player2X && ballX + ballRadius + ballDx <= player2X + paddlewidth) &&
  ballY >= player2Y && ballY <= player2Y + paddleLenght) {

    ballDx = (ballDx * -1) + (Math.random() * 5) + 3;
    ballDy = (ballDy * - 1) + (Math.random() * 10) + 4;
  }

  //if ball hit top or bottom
  if (ballY + ballRadius + ballDy > canvas.height||
    ballY < ballRadius)
    ballDy = -ballDy;
  }


function keepScore() {
  if (ballX <= 0 ) {
    playerScore2 += 1;
    player2HTML.innerHTML = `${playerScore2}`;
    resetBoard();
  }
  if (ballX >= canvas.width ) {
    playerScore1 += 1;
    player1HTML.innerHTML = `${playerScore1}`;
    resetBoard();
  }
  if (playerScore1 >= 7) {
    alert('Player 1 wins');
    resetBoard();
    resetScore();
  }
  else if (playerScore2 >= 7){
    alert('Player 2 wins');
    resetBoard();
    resetScore();
  }
}

function resetBoard(){
  ballX = ((canvas.width / 2) + (ballRadius / 2));
  ballY = canvas.height / 2;
  ballDx = 0;
  ballDy = 0;
  isBallMoving = false;
  matchStarted = false;
  player1Y = (canvas.height / 2) - (paddleLenght / 2);
  player2Y = (canvas.height / 2) - (paddleLenght / 2);
}

function resetScore() {
  playerScore1 = 0;
  playerScore2 = 0;
  player1HTML.innerHTML = '0';
  player2HTML.innerHTML = '0';
}


function inIt() {
  // to update width and height
  canvas.width = window.innerWidth - 34;
  canvas.height = window.innerHeight - 34;
  ctx.fillStyle = "#fff";

  // draw center line
  for (var i = 0; i < canvas.height - 20; i += 40) {
    ctx.fillRect(canvas.width / 2, i + 40 , 20 , 20);
  }

  // draw paddles
  ctx.fillRect(player1X, player1Y, paddlewidth, paddleLenght);
  ctx.fillRect(player2X, player2Y, paddlewidth, paddleLenght);

  // draw ball
  ctx.fillStyle = "#f356ff";
  ctx.beginPath();
  ctx.arc(ballX ,ballY, ballRadius, 0, 2*Math.PI);
  ctx.fill();

  //if someone scores
  if (ballX >= canvas.width || ballX <= 0)
    keepScore();

}
window.setInterval(function() {
  moveBall();
  inIt();
}, 1000 / 24);


window.addEventListener('keydown',playerMove);
window.addEventListener('resize', inIt);

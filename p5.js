var ball_x, ball_y, ball_dx, ball_y;

var paddle_y, paddle_y, paddle_width, paddle_height, paddle_dx;

var brickRows = 4, brickColumns = 4, brickWidth = 75, brickHeight = 20, brickPadding = 20, brickOffsetLeft = 15, brickOffsetTop = 10;

var score = 0

var bricks = []

var lost = false;

for(var c = 0; c < brickColumns; c++) {
  bricks[c] = []
  for(var r = 0; r < brickRows; r++) {
    bricks[c][r] = {x: 0, y: 0, hidden: 0}
  }
}

function createBricks() {
  for(var c = 0; c < brickColumns; c++) {
    for(var r = 0; r < brickRows; r++) {
      if(bricks[c][r].hidden === 0) {
        const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;

        bricks[c][r].x = brickX
        bricks[c][r].y = brickY
        fill("black")
        rect(bricks[c][r].x, bricks[c][r].y, brickWidth, brickHeight);
      }
    }
  }
}

function setup() {
  createCanvas(400, 400);
  
  ball_x = width/2
  ball_y = height/2
  ball_r = 10
  ball_dx = 2
  ball_dy = 2
  
  paddle_width = 90
  paddle_height = 15;
  paddle_y = height - 30;
  paddle_x = width/2 - paddle_width/2
  paddle_dx = 4
}

function isHorizontalBounce() {
  return ball_x >= width - ball_r/2 || ball_x <= ball_r/2
}

function isGameOver() {
  return ball_y >= height - ball_r/2;
}

function isVerticalBounce() {
  return ball_y < ball_r/2 || (ball_x <= paddle_x + paddle_width && ball_x >= paddle_x && ball_y >= paddle_y) 
}

function isBrickHit() {
  for(var c = 0; c < brickColumns; c++) {
    for(var r = 0; r < brickRows; r++) {
      if(bricks[c][r].hidden === 1) {
        continue
      }
      if(bricks[c][r].y <= ball_y + ball_r/2 && bricks[c][r].y + brickHeight >= ball_y + ball_r/2 && bricks[c][r].x <= ball_x + ball_r/2 && bricks[c][r].x + brickWidth >= ball_x + ball_r/2) {
        
        ball_dy = -ball_dy
        bricks[c][r].hidden = 1
        
        return true
      }
    }
  }
  return false
}

function draw() {
  clear()
  fill("black")
  
  createBricks()
  circle(ball_x, ball_y, ball_r)
  
  rect(paddle_x, paddle_y, paddle_width, paddle_height)
  
  if(keyIsDown(LEFT_ARROW)) {
    paddle_x = max(paddle_x - paddle_dx, 0)
  }
  
  if(keyIsDown(RIGHT_ARROW)) {
    paddle_x = min(paddle_x + paddle_dx, width - paddle_width)
  }
  
  if(isGameOver()) {
    ball_dy = 0
    ball_dx = 0
    lost = true
  }
  
  if(isBrickHit()) {
    score = score + 1 
  } else {
    if(isHorizontalBounce()) {
      ball_dx = -ball_dx
    }

    if(isVerticalBounce()) {
      ball_dy = -ball_dy
    }
  }
  
  text(score, width/2, height/2)
  
  if(score === 16) {
    ball_dx = 0
    ball_dy = 0
    text("You win", width/2- 18, height/2 + 18)
  }
  if(lost) {
    text("You Lose", width/2- 18, height/2 + 18)
  }
  
  ball_x = ball_x + ball_dx
  ball_y = ball_y + ball_dy
  
}
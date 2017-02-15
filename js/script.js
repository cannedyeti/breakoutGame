var paddle, ball, wallTop, wallBottom, wallLeft, wallRight;
var bricks;
var MAX_SPEED = 9;
var WALL_THICKNESS = 10;
var BRICK_W = 40;
var BRICK_H = 20;
var BRICK_MARGIN = 25;
var ROWS = 7;
var COLUMNS = 12;
var red;
var g;
var b;


function setup() {
  createCanvas(800,600);
  
  paddle = createSprite(width/2, height-50, 100, 10);
  paddle.immovable = true;

  wallTop = createSprite(width/2, -WALL_THICKNESS/2, width+WALL_THICKNESS*2, WALL_THICKNESS);
  wallTop.immovable = true;
  
  wallBottom = createSprite(width/2, height+WALL_THICKNESS/2, width+WALL_THICKNESS*2, WALL_THICKNESS);
  wallBottom.immovable = true;
  
  wallLeft = createSprite(-WALL_THICKNESS/2, height/2, WALL_THICKNESS, height);
  wallLeft.immovable = true;
  
  wallRight = createSprite(width+WALL_THICKNESS/2, height/2, WALL_THICKNESS, height);
  wallRight.immovable = true;
  
  bricks = new Group();
  
  var offsetX = width/2-(COLUMNS-1)*(BRICK_MARGIN+BRICK_W)/2;
  var offsetY = 80;
  
  for(var r = 0; r<ROWS; r++)
    for(var c = 0; c<COLUMNS; c++) {
      var brick = createSprite(offsetX+c*(BRICK_W+BRICK_MARGIN), offsetY+r*(BRICK_H+BRICK_MARGIN), BRICK_W, BRICK_H);
      red = random(50, 255);
      g = random(50, 255);
      b = random(50, 255);
      brick.shapeColor = color(red,g,b);
      bricks.add(brick);
      brick.immovable = true;
    }
  
  //the easiest way to avoid pesky multiple collision is to 
  //have the ball bigger than the bricks
  ball = createSprite(width/2, height-200, 11, 11);
  ball.shapeColor = (255, 255, 255);
  ball.maxSpeed = MAX_SPEED;
  paddle.shapeColor = ball.shapeColor = color(255,255,255);
  
}

function draw() {
  background(0, 0, 0);
  
  paddle.position.x = constrain(mouseX, paddle.width/2, width-paddle.width/2);
  
  ball.bounce(wallTop);
  // remove
  ball.bounce(wallBottom);
  ball.bounce(wallLeft);
  ball.bounce(wallRight);
  
  if(ball.bounce(paddle))
    {
    var swing = (ball.position.x-paddle.position.x)/3;
    ball.setSpeed(MAX_SPEED, ball.getDirection()+swing);
    }
  
  ball.bounce(bricks, brickHit);
  
  drawSprites();
}

function mousePressed() {
  if(ball.velocity.x == 0 && ball.velocity.y == 0)
    ball.setSpeed(MAX_SPEED, random(90-10, 90+10));
}

function brickHit(ball, brick) {
brick.remove();
}
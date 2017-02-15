var EDGE_THICKNESS = 10;
var bricks;
var COLUMNS = 9 ;
var ROWS = 6;
var red, green, blue, topEdge, leftEdge, rightEdge, bottomEdge;
var BRICK_MARGIN = 25;
var BRICK_W = 50;
var BRICK_H = 20;
var MAX_SPEED = 12;
var lives = 3;
var canvasW = window.innerWidth;
var canvasH = window.innerHeight;



$(".lives > h2").text(lives + " lives");

function setup() {
	createCanvas(canvasW, canvasH);
	paddle = createSprite(width/2, height-30, 100, 10);
  	paddle.immovable = true;

	topEdge = createSprite(width/2, -EDGE_THICKNESS/2, width+EDGE_THICKNESS*2, EDGE_THICKNESS);
	topEdge.immovable = true;

	leftEdge = createSprite(-EDGE_THICKNESS/2, height/2, EDGE_THICKNESS, height + EDGE_THICKNESS*2);
	leftEdge.immovable = true;

	rightEdge = createSprite(width + EDGE_THICKNESS/2, height/2, EDGE_THICKNESS, height);
	rightEdge.immovable = true

	bottomEdge = createSprite(width/2, height+EDGE_THICKNESS/2, width+ EDGE_THICKNESS*2, EDGE_THICKNESS);
	bottomEdge.immovable = true

	bricks = new Group();

	var offsetX = width/2-(COLUMNS-1)*(BRICK_MARGIN+BRICK_W)/2;
  	var offsetY = 90;

	for(var r = 0; r<ROWS; r++)
    	for(var c = 0; c<COLUMNS; c++) {
      		var brick = createSprite(offsetX+c*(BRICK_W+BRICK_MARGIN), offsetY+r*(BRICK_H+BRICK_MARGIN), BRICK_W, BRICK_H);
      		red = random(50, 255);
      		green = random(50, 255);
      		blue = random(50, 255);
      		brick.shapeColor = color(red,green,blue);
      		bricks.add(brick);
      		brick.immovable = true;
    }
    createBall();
	paddle.shapeColor = color(200,255,255);

}

function draw() {
	background(0, 0, 0);
	paddle.position.x = constrain(mouseX, paddle.width/2, width-paddle.width/2);
	ball.bounce(topEdge);
	ball.bounce(leftEdge);
	ball.bounce(rightEdge);
	// IMPLIMENT TO TEST
	ball.bounce(bottomEdge);
	if(ball.bounce(bottomEdge)){
		ball.remove();
		lives--;
		createBall();
		$(".lives > h2").text(lives + " lives");
		if(lives == 0) {
			ball.remove();
			$(".lives > h2").text("You fucking suck");
		}
	}
	if(ball.bounce(paddle)) {
		var change = (ball.position.x-paddle.position.x)/2;
		MAX_SPEED = MAX_SPEED * 1.01;
		ball.setSpeed(MAX_SPEED, ball.getDirection() + change);
	}
	ball.bounce(bricks, brickHit);
	drawSprites();
}
//START BALL
function mousePressed() {
  if(ball.velocity.x == 0 && ball.velocity.y == 0 && lives >= 0)
    ball.setSpeed(MAX_SPEED, random(90-10, 90+10));
	$(".start").hide();
}
// WIN/RemoveBrick
function brickHit(ball, brick) {
	brick.remove();
	checkWin();
}
function checkWin() {
	if (bricks == "") {
		$(".lives > h2").text("You fucking did it.");
		ball.remove();
	} else if (lives <= 0) {
		$(".lives > h2").text("You fucking suck");
		ball.remove();
	}
}
// Create a Ball
function createBall() {
	ball = createSprite(width/2, height-150, 11, 11);
    ball.shapeColor = (255, 255, 255);
  	ball.maxSpeed = MAX_SPEED;
}

function createBricks(){
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
};

var offsetX = width/2-(COLUMNS-1)*(BRICK_MARGIN+BRICK_W)/2;
  	var offsetY = 90;
function setup() {
  createCanvas(400, 600);
  g = createVector(0, 1);
  v = createVector(0, 0);
  ball = createVector(200, 200);
  floor = createVector(0, 500);
}

function draw() {
  background(50);
  circle(ball.x, ball.y, 60);
  v.add(g);
  ball.add(v);
  rect(floor.x, floor.y, 400, 30);
  if (ball.y + 60 / 2 >= floor.y) {
    ball.y = floor.y - 30;
    v.y = v.y * -1;
  }
}

function mousePressed() {
  if (mouseButton == LEFT) {
    ball = createVector(mouseX, mouseY);
    v = createVector(0, 0);
  }

  if (mouseButton == RIGHT) {
    floor.y = mouseY;
  }
}

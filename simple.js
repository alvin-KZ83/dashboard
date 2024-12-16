function setup() {
  createCanvas(200, 600);
  g = createVector(0, 0.098);
  v = createVector(0, 0);
  ball = createVector(100, 200);
  floor = createVector(0, 500);
}

function draw() {
  background(50);
  circle(ball.x, ball.y, 50);
  v.add(g);
  ball.add(v);
  rect(floor.x, floor.y, 400, 20);
  if (ball.y + 50 / 2 >= floor.y) {
    v.mult(-1);
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

let g, v, ball, floor, ballColor, floorColor;

function setup() {
  createCanvas(400, 600);
  g = createVector(0, 1);
  v = createVector(0, 0);
  ball = createVector(200, 200);
  floor = createVector(0, 500);
  
  // Set initial colors for the ball and floor
  ballColor = color(255, 100, 100); // Red-ish ball
  floorColor = color(100, 200, 255); // Blue-ish floor
}

function draw() {
  // Background gradient
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color(30, 30, 60), color(100, 100, 150), inter);
    stroke(c);
    line(0, y, width, y);
  }

  // Ball
  fill(ballColor);
  noStroke();
  circle(ball.x, ball.y, 60);

  // Ball physics
  v.add(g);
  ball.add(v);

  // Floor
  fill(floorColor);
  rect(floor.x, floor.y, 400, 30);

  // Ball collision with the floor
  if (ball.y + 60 / 2 >= floor.y) {
    ball.y = floor.y - 30; // Prevent sinking into the floor
    v.y = v.y * -1; // Reverse velocity
    
    // Change the ball's color on collision
    ballColor = color(random(255), random(255), random(255));
  }
}

function mousePressed() {
  if (mouseButton == LEFT) {
    ball = createVector(mouseX, mouseY); // Move ball to mouse position
    v = createVector(0, 0); // Reset velocity
    ballColor = color(random(255), random(255), random(255)); // New ball color
  }

  if (mouseButton == RIGHT) {
    floor.y = mouseY; // Move the floor
    floorColor = color(random(255), random(255), random(255)); // New floor color
  }
}

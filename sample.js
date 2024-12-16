function setup() {
    createCanvas(400, 800);
    g = createVector(0, 0.098);
    v = createVector(0, 0);
    ball = createVector(200, 200);
    floor = createVector(0, 600);
    a = 255
    b = 255
    c = 255
  }
  
  function draw() {
    background(50);
    a = map(ball.y, 0, 800, 125, 250)
    b = map(ball.y, 0, 800, 0, 125)
    c = map(ball.y, 0, 800, 250, 125)
    fill(a, b, c)
    circle(ball.x, ball.y, 50);
    v.add(g);
    ball.add(v)
    fill(255)
    rect(floor.x, floor.y, 400, 20);
    
    if (ball.y + 50 / 2 >= floor.y) {
      v.mult(-1);
    }
  }
  
  
  function mousePressed() {
    if (mouseButton == LEFT) {
      ball = createVector(mouseX, mouseY)
      v = createVector(0, 0)
    }
    
    if (mouseButton == RIGHT) {
      floor.y = mouseY
    }
  }
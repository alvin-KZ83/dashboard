function setup() {
    createCanvas(200, 600);
    x = 100;
    y = 50;
    v = 0;
    g = 1;
}


function draw() {
    background(225, 430, 30);
    fill(30, 20, 50);
    circle(x, y, mouseX);
    v = v + g;
    y = y + v;
    if (y + 60 / 2 >= 600) {
        v = v * -1
    }
}
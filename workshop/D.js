function setup() {
    createCanvas(200, 600);
    x = 100;
    y = 50;
    v = 0;
    g = 1;
}


function draw() {
    background(50);
    fill(255, 0, 0);
    circle(x, y, 60);
    v = v + g;
    y = y + v;
    if (y + 60 / 2 >= 600) {
        v = v * -1
    }
}
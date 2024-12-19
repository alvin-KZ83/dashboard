function setup() {
    createCanvas(200, 600);
    x = 100;
    y = 50;
    v = 0;
    g = 1;
    t = 6;
}


function draw() {
    background(240, 245, 255);
    fill (0, 0, 0);
    circle(x, y, 60);
    v += g;
    y += v;
    x += t

    if (y + 60 / 2 >= 600) {
        v = v * -1
    }

    if (y <= 600) {
        v = v * -1
    }

    if (x + 60 / 2 >= 200) {
        t = t * -1
    }
    
    if (x + 60 / 2 <= 0) {
        t = t * -1
    }
}
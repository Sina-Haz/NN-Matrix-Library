let r,g,b;

function setup(){
    let nn = new NeuralNetwork(3,3,2);
    nn.setLearningRate(0.1);
    noLoop();
    createCanvas(800,500);
    pickColor();
}

function pickColor(){
    r = random(255);
    g = random(255);
    b = random(255);
    redraw();
}

function mouseClicked(){
    pickColor();
}

function draw(){
    background(r,g,b);
    textAlign(CENTER,CENTER);
    let blackX = width/4;
    let blackY = height/2;
    let whiteX = width*3/4;
    let whiteY = height/2;
    textSize(48);
    fill(0);
    text("black",blackX,blackY);
    fill(255);
    text("white",whiteX,whiteY);

}


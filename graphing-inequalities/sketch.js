
let model;
let view;
let controller;

function setup(){
    createCanvas(1000, 500);
    model = new GraphicModel();
    view = new GraphicView(model);
    controller = new GraphicController(model, view);
   
}

function draw(){
    background(255);
    controller.updateAndDraw();
}


function mousePressed(){
    controller.handleMousePressed(mouseX, mouseY);
}

function mouseDragged(){
    controller.handleMouseDragged(mouseX)
}
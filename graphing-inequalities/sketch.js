
let model;
let view;
let controller;
let checkAnswerButton;
let newProblemButton;
let feedbackMessage = "";
let attepmts = 3;

function setup(){
    createCanvas(1000, 500);
    model = new GraphicModel();
    view = new GraphicView(model);
    controller = new GraphicController(model, view);


    newProblemButton = createButton('New Problem');
    newProblemButton.position(width - 50, height - 20);
    newProblemButton.mousePressed(() => {
        model.getQuestion();

    });

    checkAnswerButton = createButton('Check 1');
    checkAnswerButton.position(this.model.start, this.model.pointY + 70);
    

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
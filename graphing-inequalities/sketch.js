
let model;
let view;
let controller;
let checkAnswerButton;
let newProblemButton;
let feedbackMessage = "";
//let attempts = 3;
let lastCheckedPointX = null;
let showCorrectAnswer = false;

function setup() {
    createCanvas(1000, 500);
    model = new GraphicModel();
    view = new GraphicView(model);
    controller = new GraphicController(model, view);


    newProblemButton = createButton('New Problem');
    newProblemButton.position(width - 50, height - 20);
    newProblemButton.mousePressed(() => {
        restToDefault();
    });

    checkAnswerButton = createButton(`Check ${model.attempts}`);
    checkAnswerButton.position(this.model.start, this.model.pointY + 70);
    checkAnswerButton.mousePressed(() => {
        if (model.attempts > 0 && model.pointX !== lastCheckedPointX) {

            const result = model.checkAnswer(view.leftToggleState, view.rightToggleState);
            lastCheckedPointX = model.pointX;

            if (result) {
                feedbackMessage = "Correct ✔";
                checkAnswerButton.html('Correct ✔');
                checkAnswerButton.attribute('disabled', true);
            }
            else {
                model.attempts--;
                feedbackMessage = `Incorrect❌ ${model.attempts} attempts remaining.`;
                checkAnswerButton.html(`Check ${model.attempts}`);
                if (model.attempts == 0) {
                    showCorrectAnswer = true;
                    feedbackMessage = `Incorrect❌ Correct answer displayed below.`;
                    checkAnswerButton.html(`Check ${model.attempts}`);
                    checkAnswerButton.attribute('disabled', true);
                }
            }
        }
    })

}


function restToDefault(){
    model.generateQuestions();
    feedbackMessage = "";
    model.attempts = 3;
    showCorrectAnswer = false;
    checkAnswerButton.html(`Check ${model.attempts}`);
    checkAnswerButton.removeAttribute('disabled');
    lastCheckedPointX = null;
    model.pointX = model.mapValueToPixel(0);
    view.leftToggleState = true;
    view.rightToggleState = true;
}


function draw() {
    background(255);
    controller.updateAndDraw();

    //display feedback

    fill(0);
    textSize(16);
    textAlign(CENTER, CENTER);
    text(`${feedbackMessage}`, model.start + 150, model.pointY + 100);

    if(showCorrectAnswer){
        controller.displaySolution();

    }

    // if (lastCheckedPointX !== model.pointX) {
    //     if (attempts > 0 && !showCorrectAnswer) {
    //         checkAnswerButton.removeAttribute('disabled'); // Enable button
    //     }
    // }
    // lastCheckedPointX = model.pointX; 

}


function mousePressed() {
    controller.handleMousePressed(mouseX, mouseY);
}

function mouseDragged() {
    controller.handleMouseDragged(mouseX)
}
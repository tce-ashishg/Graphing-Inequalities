class GraphicController {

    constructor(model, view){
        this.model = model;
        this.view = view;
        this.dragged = false;
    }

    handleMousePressed(mouseX, mouseY){
        if (this.model.attempts <= 0) return;

        let d = dist(mouseX, mouseY, this.model.pointX, this.model.pointY);
        if(d < this.model.snappingRange){
            this.dragged = true;
        }
        this.view.handleMousePressed(mouseX, mouseY);
    }

    handleMouseDragged(mouseX){
        if (this.model.attempts <= 0) return;

        if(this.dragged){
            let constrainedX = constrain(mouseX, this.model.start + this.model.snappingRange, this.model.end - this.model.snappingRange);
            this.model.pointX = this.model.getClosesetTick(constrainedX);
        }
    }

    updateAndDraw(){
        this.view.displayLine(this.model.start, this.model.pointY, this.model.end, this.model.range);
        this.view.drawPoint(this.model.pointX, this.model.pointY, 15, color(144, 3, 252));
        this.view.drawDraggingLine(this.model.start, this.model.pointY, this.model.pointX, this.model.end);
        this.view.drawToggle();
        this.view.displayQuestions();

    }

    displaySolution(){
        const correctPointX = model.getCorrectPointX();
        this.view.displayLine(this.model.start, 400, this.model.end, this.model.range);
        this.view.drawPoint(correctPointX, 380, 15, color(46,139,87));
        this.view.resultDraggingLine(this.model.start, 380, correctPointX, this.model.end, this.model.correctDirection);
    }
}
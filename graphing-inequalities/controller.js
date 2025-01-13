class GraphicController {

    constructor(model, view){
        this.model = model;
        this.view = view;
        this.dragged = false;
    }

    handleMousePressed(mouseX, mouseY){
        let d = dist(mouseX, mouseY, this.model.pointX, this.model.pointY);
        if(d < this.model.snappingRange){
            this.dragged = true;
        }
        this.view.handleMousePressed(mouseX, mouseY);
    }

    handleMouseDragged(mouseX){
        if(this.dragged){
            let constrainedX = constrain(mouseX, this.model.start + this.model.snappingRange, this.model.end - this.model.snappingRange);
            this.model.pointX = this.model.getClosesetTick(constrainedX);
        }
    }

    updateAndDraw(){
        this.view.displayQuestions();
        this.view.displayLine();
        this.view.drawPoint();
        this.view.drawDraggingLine();
        this.view.drawToggle();
    }
}
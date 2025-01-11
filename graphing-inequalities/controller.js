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
            let constranedX = constrain(mouseX, this.model.start + 30, this.model.end - 30);
            this.model.pointX = this.model.getClosesetTick(constranedX);
        }
    }

    updateAndDraw(){
        this.view.displayLine();
        this.view.drawPoint();
        this.view.drawDraggingLine();
        this.view.drawToggle();
    }
}
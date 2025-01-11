
class GraphicView {

    constructor(model) {
        this.model = model;
        
        this.leftToggleState = true;
        this.rightToggleState = true;
    }


    handleMousePressed(mouseX, mouseY){
        let d1 = dist(mouseX, mouseY, this.model.start + 20, this.model.pointY + 50);
        console.log(d1);
        if(d1 < 25){
            if(this.leftToggleState){
            this.leftToggleState = false;
            }
            else {
                this.leftToggleState = true;
            }
        }

        let d2 = dist(mouseX, mouseY, this.model.end - 20, this.model.pointY + 50);
        console.log(d2);

        if(d2 < 25){
            if(this.rightToggleState){
                this.rightToggleState = false;
            }
            else {
                this.rightToggleState = true;
            }
        }
    }

    displayLine() {

        fill(0);
        stroke(0);
        strokeWeight(2);
        line(this.model.start - 10, this.model.pointY, this.model.end + 10, this.model.pointY);

        for (let i = -this.model.range; i <= this.model.range; i++) {
            const x = this.model.mapValueToPixel(i);
            stroke(0);
            strokeWeight(2);
            line(x, this.model.pointY - 5, x, this.model.pointY + 5);

            if (i % 2 === 0) {
                fill(0);
                noStroke();
                textSize(12);
                textAlign(CENTER, CENTER);
                text(i, x, this.model.pointY + 15);
            }

        }

        //Arrow left side
        line(this.model.start - 10, this.model.pointY, this.model.start - 5, this.model.pointY - 5);
        line(this.model.start - 10, this.model.pointY, this.model.start - 5, this.model.pointY + 5);

        //Arrow right side
        line(this.model.end + 10, this.model.pointY, this.model.end + 5, this.model.pointY - 5);
        line(this.model.end + 10, this.model.pointY, this.model.end + 5, this.model.pointY + 5);
    }

    drawPoint() {
        fill(144, 3, 252);
        noStroke();
        ellipse(this.model.pointX, this.model.pointY - 25, 15);


        fill(144, 3, 252, 0.5);
        stroke(144, 3, 252);
        ellipse(this.model.pointX, this.model.pointY - 25, 25);

    }

    drawDraggingLine() {
        stroke(144, 3, 252);
        strokeWeight(3);

        if (this.leftToggleState) {
            line(this.model.start - 10, this.model.pointY - 25, this.model.pointX, this.model.pointY - 25);
            //Arrow left side
            line(this.model.start - 10, this.model.pointY - 25, this.model.start - 5, this.model.pointY - 30);
            line(this.model.start - 10, this.model.pointY - 25, this.model.start - 5, this.model.pointY - 20);

        }
         if (this.rightToggleState) {
            line(this.model.pointX, this.model.pointY - 25, this.model.end + 10, this.model.pointY - 25);

            //Arrow right side
            line(this.model.end + 10, this.model.pointY - 25, this.model.end + 5, this.model.pointY - 30);
            line(this.model.end + 10, this.model.pointY - 25, this.model.end + 5, this.model.pointY - 20);

        }

        // else {
        //     line(this.model.start - 10, this.model.pointY - 25, this.model.end + 10, this.model.pointY - 25);
        //     //Arrow left side
        //     line(this.model.start - 10, this.model.pointY - 25, this.model.start - 5, this.model.pointY - 30);
        //     line(this.model.start - 10, this.model.pointY - 25, this.model.start - 5, this.model.pointY - 20);

        //     //Arrow right side
        //     line(this.model.end + 10, this.model.pointY - 25, this.model.end + 5, this.model.pointY - 30);
        //     line(this.model.end + 10, this.model.pointY - 25, this.model.end + 5, this.model.pointY - 20);
        // }

    }


    drawToggle() {

        let width = 50;
        let height = 25;

        fill(this.leftToggleState ? color(144, 3, 252) : color(200, 200, 200));
        noStroke();
        rect(this.model.start, this.model.pointY + 25, width, height, height / 2);

        const handleL = this.leftToggleState ? this.model.start + width - height / 2 : this.model.start + height / 2;

        fill(255);
        ellipse(handleL, this.model.pointY + 25 + height / 2, height * 0.9);

        fill(0);
        textSize(18);
        textAlign(CENTER, CENTER);
        text('Left Arrow Visible', this.model.start + 130, this.model.pointY + 40);


        fill(this.rightToggleState ? color(144, 3, 252) : color(200, 200, 200));
        rect(this.model.end - width, this.model.pointY + 25, width, height, height / 2);

        const handleR = this.rightToggleState ? this.model.end - height / 2 : this.model.end - width + height / 2;

        fill(255);
        ellipse(handleR, this.model.pointY + 25 + height / 2, height * 0.9);

        fill(0);
        textSize(18);
        textAlign(CENTER, CENTER);
        text('Right Arrow Visible', this.model.end - 130, this.model.pointY + 40);
    }
}
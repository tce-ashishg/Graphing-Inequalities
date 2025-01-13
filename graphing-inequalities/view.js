
class GraphicView {

    constructor(model) {
        this.model = model;
        this.leftToggleState = true;
        this.rightToggleState = true;
    }


    displayQuestions() {
        fill(0);
        textSize(20);
        textAlign(LEFT, CENTER);
        if (this.model.question) {
            text(`Graph the inequality ${this.model.question}`, this.model.start, 50);
        }
        else {
            text('Press the New Problem Button to get started!', this.model.start, 50);
        }
    }


    handleMousePressed(mouseX, mouseY) {
        let d1 = dist(mouseX, mouseY, this.model.start + 20, this.model.pointY + 50);
        //console.log(d1);
        if (d1 < 25) {
            if (this.leftToggleState) {
                this.leftToggleState = false;
            }
            else {
                this.leftToggleState = true;
            }
        }

        let d2 = dist(mouseX, mouseY, this.model.end - 20, this.model.pointY + 50);
        // console.log(d2);

        if (d2 < 25) {
            if (this.rightToggleState) {
                this.rightToggleState = false;
            }
            else {
                this.rightToggleState = true;
            }
        }
    }

    displayLine(start, pointY, end, range) {

        fill(0);
        stroke(0);
        strokeWeight(2);
        line(start - 10, pointY, end + 10, pointY);

        for (let i = -range; i <= range; i++) {
            const x = this.model.mapValueToPixel(i);
            stroke(0);
            strokeWeight(2);
            line(x, pointY - 5, x, pointY + 5);

            if (i % 2 === 0) {
                fill(0);
                noStroke();
                textSize(12);
                textAlign(CENTER, CENTER);
                text(i, x, pointY + 15);
            }

        }

        //Arrow left side
        line(start - 10, pointY, start - 5, pointY - 5);
        line(start - 10, pointY, start - 5, pointY + 5);

        //Arrow right side
        line(end + 10, pointY, end + 5, pointY - 5);
        line(end + 10, pointY, end + 5, pointY + 5);
    }

    drawPoint(pointX, pointY, size, c) {
        fill(c);
        noStroke();
        ellipse(pointX, pointY - 25, 15);


        fill(144, 3, 252, 0.5);
        stroke(c);
        ellipse(pointX, pointY - 25, size + 10);

    }

    drawDraggingLine(start, pointY, pointX, end) {
        stroke(144, 3, 252);
        strokeWeight(3);

        if (this.leftToggleState) {
            line(start - 10, pointY - 25, pointX, pointY - 25);
            //Arrow left side
            line(start - 10, pointY - 25, start - 5, pointY - 30);
            line(start - 10, pointY - 25, start - 5, pointY - 20);

        }
        if (this.rightToggleState) {
            line(pointX, pointY - 25, end + 10, pointY - 25);

            //Arrow right side
            line(end + 10, pointY - 25, end + 5, pointY - 30);
            line(end + 10, pointY - 25, end + 5, pointY - 20);

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

    resultDraggingLine(start, pointY, pointX, end, correctDirection) {

        stroke(46,139,87);
        strokeWeight(3);

        if (correctDirection == 'left' || correctDirection == 'both') {
            line(start - 10, pointY - 25, pointX, pointY - 25);
            //Arrow left side
            line(start - 10, pointY - 25, start - 5, pointY - 30);
            line(start - 10, pointY - 25, start - 5, pointY - 20);

        }
        if (correctDirection == 'right' || correctDirection == 'both') {
            line(pointX, pointY - 25, end + 10, pointY - 25);

            //Arrow right side
            line(end + 10, pointY - 25, end + 5, pointY - 30);
            line(end + 10, pointY - 25, end + 5, pointY - 20);

        }
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
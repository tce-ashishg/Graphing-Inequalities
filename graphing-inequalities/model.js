
class GraphicModel {

    constructor() {
        this.range = 15;
        this.start = 50;
        this.end = 950;
        this.pointX = this.mapValueToPixel(0);
        this.pointY = 150;
        this.snappingRange = 30;
        this.question = "";
        this.correctValue = 0;
        this.correctDirection = "";
        this.attempts = 3;
        this.generateQuestions();
    }

    mapValueToPixel(value) {
        return map(value, -this.range, this.range, this.start, this.end);
    }

    mapPixelToValue(pixel) {
        return map(pixel, this.start, this.end, -this.range, this.range);
    }


    generateQuestions() {
        const operators = ['<', '>', '<=', '>=', '!=', '='];
        const randomOperator = operators[Math.floor(Math.random() * operators.length)];
        let randomNumber;

        do {
            randomNumber = Math.floor(Math.random() * 29) - 14;
        } while (randomNumber === 0);

        this.question = `x ${randomOperator} ${randomNumber}`;
        this.correctValue = randomNumber;
        this.correctDirection = this.getDirection(randomOperator);
    }

    getDirection(operator) {

        if (operator === "<" || operator === "<=") {
            return "left";
        }
        if (operator === ">" || operator === ">=") {
            return "right";
        }
        if (operator === "=" || operator === "!=") {
            return "both"; // Both directions for != and =
        }
        return "";
    }

    // getQuestion() {
    //     let index = Math.floor(Math.random() * this.questionBank.length);
    //     return this.question = this.questionBank[index];
    // }

    getClosesetTick(pixel) {
        let value = this.mapPixelToValue(pixel);
        let snappingValue = Math.round(value);
        return this.mapValueToPixel(snappingValue);
    }


    checkAnswer(leftToggle, rightToggle) {

        const selectValue = this.mapPixelToValue(this.pointX);

        if (selectValue === this.correctValue && ((this.correctDirection === "left" && leftToggle && !rightToggle) ||
            (this.correctDirection === "right" && rightToggle && !leftToggle) ||
            (this.correctDirection === "both" && leftToggle && rightToggle))) {
            return true;
        }
       // console.log(this.correctDirection);
        return false;

        // if (!this.question) return false;

        // const [_, operator, num] = this.question.split(' ');
        // const x = Math.round(this.mapPixelToValue(this.pointX));

        // switch (operator) {
        //     case "<": return x < Number(num);
        //     case ">": return x > Number(num);
        //     case "<=": return x <= Number(num);
        //     case ">=": return x >= Number(num);
        //     case "!=": return x != Number(num);
        //     case "=": return x == Number(num);
        //     default:
        //         return false;
        // }

    }

    getCorrectPointX() {
        const [_, operator, num] = this.question.split(' ');
        return this.mapValueToPixel(Number(num));
    }

}
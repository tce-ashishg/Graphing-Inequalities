
class GraphicModel {

    constructor() {
        this.range = 15;
        this.start = 50;
        this.end = 950;
        this.pointX = this.mapValueToPixel(0);
        this.pointY = 200;
        this.snappingRange = 30;
        this.question = null;
        this.questionBank = [];
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
        for (let i = -14; i <= 14; i++) {
            for (let op of operators) {
                this.questionBank.push(`x ${op} ${i}`)
            }
        }
    }

    getQuestion() {
        let index = Math.floor(Math.random() * this.questionBank.length);
        return this.question = this.questionBank[index];
    }

    getClosesetTick(pixel) {
        let value = this.mapPixelToValue(pixel);
        let snappingValue = Math.round(value);
        return this.mapValueToPixel(snappingValue);
    }


    checkAnswer() {
        if (!this.question) return false;

        const [_, operator, num] = this.question.split(' ');
        const x = Math.round(this.mapPixelToValue(this.pointX));

        switch (operator) {
            case "<": return x < Number(num);
            case ">": return x > Number(num);
            case "<=": return x <= Number(num);
            case ">=": return x >= Number(num);
            case "!=": return x != Number(num);
            case "=": return x == Number(num);
            default :
            return false;
        }

    }

    getCorrectPointX() {
        const [_, operator, num] = this.question.split(' ');
        return this.mapValueToPixel(Number(num));
    }

}
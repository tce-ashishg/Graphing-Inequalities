
class GraphicModel{

    constructor(){
        this.range = 15;
        this.start = 50;
        this.end = 950;
        this.pointX = this.mapValueToPixel(0);
        this.pointY = 200;
        this.snappingRange = 30;
    }

    mapValueToPixel(value){
        return map(value, -this.range, this.range, this.start, this.end);
    }

    mapPixelToValue(pixel){
        return map(pixel, this.start, this.end, -this.range, this.range);
    }
    
    getClosesetTick(pixel){
        let value = this.mapPixelToValue(pixel);
        let snappingValue = Math.round(value);
        return this.mapValueToPixel(snappingValue);
    }

}
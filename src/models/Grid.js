import helpers from '../helpers';
import Point from './Point';
export default class Grid{

    constructor(canvas, config){
        this.rows = config.Rows;
        this.cols = config.Columns;
        this.w = canvas.clientWidth * window.devicePixelRatio;
        this.h = canvas.clientHeight * window.devicePixelRatio;
        this.points = [];
        this.intervalX = this.w / this.cols;
        this.intervalY = this.h / this.rows;
        this.fractionX = this.intervalX * (config.PositionRandomPercentageX / 100);
        this.fractionY = this.intervalY * (config.PositionRandomPercentageY / 100);

        this.BuildPoints();
    }

    BuildPoints(){
        for(var r = 0; r <= this.rows; r++){
            var row = [];
            
            for(var c = 0; c <= this.cols; c++){
                var x = helpers.getRandomInt((this.intervalX * c) - this.fractionX, (this.intervalX * c) + this.fractionX);
                var y = helpers.getRandomInt((this.intervalY * r) - this.fractionY, (this.intervalY * r) + this.fractionY);
                
                if(r === 0){
                    y = helpers.getRandomInt((this.intervalY * r) - this.fractionY, 0);
                }
    
                if(r === this.rows){
                    y = helpers.getRandomInt(this.h, this.h + this.fractionY);
                }
    
                if( c === 0){
                    x = helpers.getRandomInt((this.intervalX * c) - this.fractionX, 0);
                }
    
                if( c === this.cols){
                    x = helpers.getRandomInt(this.w, this.w + this.fractionX);
                }
    
                row.push(new Point(x, y));
            }
            
            this.points.push(row);
        }
    }
}
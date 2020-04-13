import helpers from '../helpers';
import Axis from '../enums/Axis';
import GradientDirection from '../enums/GradientDirection';

export default class Triangle{

    constructor(p1, p2, p3, config, canvas){
        this.Point1 = p1;
        this.Point2 = p2;
        this.Point3 = p3;

        this.SetFillColor(config, canvas);
    }

    GetPath(){
        var path = new Path2D();
        path.moveTo(this.Point1.x, this.Point1.y);
        path.lineTo(this.Point2.x, this.Point2.y);
        path.lineTo(this.Point3.x, this.Point3.y);
        path.closePath();
    
        return path;
    }

    SetFillColor(gradientSettings, canvas){
        let getColor, r = 0, g = 0, b = 0;
        let pointsX = [this.Point1.x, this.Point2.x, this.Point3.x];
        let pointsY = [this.Point1.y, this.Point2.y, this.Point3.y];

        pointsX.sort(function(a, b){return a-b});
        pointsY.sort(function(a, b){return a-b});

        if(gradientSettings.Direction === GradientDirection.LINEAR_BOTTOM || gradientSettings.Direction === GradientDirection.LINEAR_TOP){
            if(gradientSettings.Direction === GradientDirection.LINEAR_BOTTOM){
                this.FillStyle = gradientSettings.GetColourForPoint(pointsY[0], pointsY[pointsY.length-1], canvas.height);
            }else{
                this.FillStyle = gradientSettings.GetColourForPoint(canvas.height - pointsY[0], canvas.height - pointsY[pointsY.length-1], canvas.height);
            }
        }

        if(gradientSettings.Direction === GradientDirection.LINEAR_LEFT || gradientSettings.Direction === GradientDirection.LINEAR_RIGHT){
            if(gradientSettings.Direction === GradientDirection.LINEAR_RIGHT){
                this.FillStyle = gradientSettings.GetColourForPoint(pointsX[0], pointsX[pointsX.length-1], canvas.width);
            }else{
                this.FillStyle = gradientSettings.GetColourForPoint(canvas.width - pointsX[0], canvas.width - pointsX[pointsX.length-1], canvas.width);
            }
        }
    }

    
}
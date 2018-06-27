import { helpers } from '../helpers';
import { Axis } from '../enums/Axis';

export default class Triangle{

    constructor(p1, p2, p3, config, canvas){
        this.Point1 = p1;
        this.Point2 = p2;
        this.Point3 = p3;

        this.SetFillColor(config, canvas);
    }

    DrawPath(context){
        var style = this.FillStyle.replace(/rgb\((\d+),(\d+),(\d+)\)/, function(match, g1, g2, g3, offset, string){
            return "rgb(" + Math.round(parseInt(g1) * 1.2) + "," + Math.round(parseInt(g2) * 1.2) + "," + Math.round(parseInt(g3) * 1.25) + ")";
        });
    
        context.beginPath();
        context.fillStyle = style;
        context.moveTo(this.Point1.x, this.Point1.y);
        context.lineTo(this.Point2.x, this.Point2.y);
        context.lineTo(this.Point3.x, this.Point3.y);
        context.fill();
    }

    GetPath(){
        var path = new Path2D();
        path.moveTo(this.Point1.x, this.Point1.y);
        path.lineTo(this.Point2.x, this.Point2.y);
        path.lineTo(this.Point3.x, this.Point3.y);
        path.closePath();
    
        return path;
    }

    SetFillColor(colourProfiles, canvas){
        let getColor, r = 0, g = 0, b = 0;
        let pointsX = [this.Point1.x, this.Point2.x, this.Point3.x];
        let pointsY = [this.Point1.y, this.Point2.y, this.Point3.y];

        pointsX.sort(function(a, b){return b-a});
        pointsY.sort(function(a, b){return b-a});

        if(colourProfiles.R.Axis === Axis.Y){
            r = colourProfiles.R.GetColour(pointsY[pointsY.length-1], pointsY[0], canvas);
        }else{
            r = colourProfiles.R.GetColour(pointsX[pointsX.length-1], pointsX[0], canvas);
        }

        if(colourProfiles.G.Axis === Axis.Y){
            g = colourProfiles.G.GetColour(pointsY[pointsY.length-1], pointsY[0], canvas);
        }else{
            g = colourProfiles.G.GetColour(pointsX[pointsX.length-1], pointsX[0], canvas);
        }

        if(colourProfiles.B.Axis === Axis.Y){
            b = colourProfiles.B.GetColour(pointsY[pointsY.length-1], pointsY[0], canvas);
        }else{
            b = colourProfiles.B.GetColour(pointsX[pointsX.length-1], pointsX[0], canvas);
        }

        this.FillStyle = 'rgb(' + r + ',' + g + ',' + b  + ')';
    }

    
}
import { MetaDataKeys } from './enums/MetaDataKeys';
import ArrayMeta from './models/ArrayMeta';
import Config from './models/Config';
import Grid from './models/Grid';
import Triangle from './models/Triangle';

export default class Geometrize{

    constructor(targetId, config = null){
        this.CreateRenderer(targetId);

        if(this.Canvas !== null){
            if(config !== null){
                this.AddSettings(config);
            }else{
                this.AddSettings();
            }

            this.Grid = new Grid(this.Settings.Grid);
            this.Triangles = [];
            this.RowMeta = [];
            this.ColMeta = [];
            this.Mouse = {
                X: 0,
                Y: 0
            };
            this.CreateTriangles(this.Settings.ColourChannelSettings, this.Canvas);
            this.Draw();
        }
    }

    //method for guikding canvas element
    CreateRenderer(targetId){
        let el = document.getElementById(targetId);
        if(document.getElementById(targetId) !== null)
        {
            if(document.getElementById(targetId).tagName.toUpperCase() === 'CANVAS'){
                el.setAttribute('width', getComputedStyle(el).getPropertyValue('width').slice(0,-2) * window.devicePixelRatio);
                el.setAttribute('height', getComputedStyle(el).getPropertyValue('height').slice(0,-2) * window.devicePixelRatio);
                this.Canvas = el;
                this.Context = el.getContext('2d');
            }else{
                let canvas = document.createElement("canvas");
                canvas.id = "geometrize";
                el.appendChild(canvas);

                if(parseInt(getComputedStyle(el).getPropertyValue('width').slice(0,-2)) > 0){
                    canvas.setAttribute('width', getComputedStyle(el).getPropertyValue('width').slice(0,-2) * window.devicePixelRatio);    
                }else{
                    console.warn('Container for Geometrize canvas has a width of 0. Defaulting the width of canvas to window width * dpi.')
                    canvas.setAttribute('width', window.innerWidth * window.devicePixelRatio);
                }

                if(parseInt(getComputedStyle(el).getPropertyValue('height').slice(0,-2)) > 0){
                    canvas.setAttribute('height', getComputedStyle(el).getPropertyValue('height').slice(0,-2) * window.devicePixelRatio);    
                }else{
                    console.warn('Container for Geometrize canvas has a height of 0. Defaulting the height of canvas to window height * dpi.')
                    canvas.setAttribute('width', window.innerHeight * window.devicePixelRatio);
                }

                this.Canvas = canvas;
                this.Context = canvas.getContext('2d');
            }
        }else{
            console.error("No target was found for the renderer. Check the id passed in.");
            this.Canvas = null;
            this.Context = null;
        }
    }

    AddSettings(config){
        this.Settings = new Config(this.Canvas);

        if(arguments.length > 0){
            const self = this;
            Object.getOwnPropertyNames(config).forEach(function(val, inx, arr){
                if(self.Settings.hasOwnProperty(val)){
                    self.Settings[val] = config[val];
                }
            });
        }
    }

    GetSettings(){
        return this.Settings;
    }

    CreateTriangles(colourSettings, canvas){
        let colMins = [], colMaxs = [];
        for(let r = 0; r < this.Grid.points.length-1; r++){
            let triangleRow = [], rowMinY = this.Grid.points[r][0].y, rowMaxY = this.Grid.points[r][0].y, rowMeta = new ArrayMeta();

            for(let c = 0; c < this.Grid.points[r].length - 1; c++){
                triangleRow.push(new Triangle(this.Grid.points[r][c], this.Grid.points[r+1][c], this.Grid.points[r][c+1], colourSettings, canvas));
                triangleRow.push(new Triangle(this.Grid.points[r][c+1], this.Grid.points[r+1][c+1], this.Grid.points[r+1][c], colourSettings, canvas));
    
                let points = [this.Grid.points[r][c], this.Grid.points[r+1][c], this.Grid.points[r][c+1], this.Grid.points[r+1][c+1]];
                for(let p=0; p < points.length; p++){
                    if(points[p].y < rowMinY){
                        rowMinY = points[p].y;
                    }
                    if(points[p].y > rowMaxY){
                        rowMaxY = points[p].y;
                    }
                }

                if(colMins.length > c){
                    if(colMins[c] > this.Grid.points[r][c].x){
                        colMins[c] = this.Grid.points[r][c].x;
                    }
                }else{
                    colMins.push(this.Grid.points[r][c].x)
                }

                if(colMaxs.length > c){
                    if(colMaxs[c] < this.Grid.points[r][c].x){
                        colMaxs[c] = this.Grid.points[r][c].x;
                    }
                }else{
                    colMaxs.push(this.Grid.points[r][c].x)
                }
            }

            rowMeta.AddMeta(MetaDataKeys.MIN_Y, rowMinY);
            rowMeta.AddMeta(MetaDataKeys.MAX_Y, rowMaxY);

            this.Triangles.push(triangleRow);
            this.RowMeta.push(rowMeta);
        }

        for(let col = 0; col < colMins.length; col++){
            let colMeta = new ArrayMeta();
            colMeta.AddMeta(MetaDataKeys.MIN_X, colMins[col]);
            colMeta.AddMeta(MetaDataKeys.MAX_X, colMaxs[col]);
            this.ColMeta.push(colMeta);
        }
    }

    DrawTriangles(){
        for(let tr=0; tr < this.Triangles.length; tr++){
            let triangles = this.Triangles[tr];
            for(let t=0; t < triangles.length; t++){
                this.Context.beginPath();
                this.Context.fillStyle = triangles[t].FillStyle;
                this.Context.moveTo(triangles[t].Point1.x, triangles[t].Point1.y);
                this.Context.lineTo(triangles[t].Point2.x, triangles[t].Point2.y);
                this.Context.lineTo(triangles[t].Point3.x, triangles[t].Point3.y);
                this.Context.fill();
            }
        }
    }

    Draw(){

        this.DrawTriangles();
        //see if mouse is in triangle
    
        // let rowTargets = [], target = 0;

        // for(let tr = 0; tr < this.Triangles.length; tr++)
        // {
        //     if(this.Mouse.Y >= this.Triangles[tr].minY && this.Mouse.Y <= this.Triangles[tr].maxY){
        //         rowTargets.push(this.Triangles[tr]);
        //     }
        // }
    
        //we have cases now loop through each and see if it is our triangle
        // for(var rt = 0; rt < rowTargets.length; rt++){
        //     for(var t = 0; t < rowTargets[rt].triangles.length; t++){
        //         var triangle = rowTargets[rt].triangles[t];
        //         if(context.isPointInPath(triangle.GetPath(), mouse.x, mouse.y))
        //         {
        //             target = triangle;
        //             break;
        //         }
        //     }
        //     if(target !== 0){
        //         break;
        //     }
        // }
    
        // if(target !== 0){
        //     target.DrawSelectedPath();
        // }
    
        requestAnimationFrame(() => {this.Draw()});
    }

}
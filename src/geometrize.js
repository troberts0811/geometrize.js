import MetaDataKeys from './enums/MetaDataKeys';
import ArrayMeta from './models/ArrayMeta';
import Config from './models/Config';
import Grid from './models/Grid';
import MutationResult from './models/MutationResult';
import Triangle from './models/Triangle';

export default class Geometrize{

    constructor(targetId, config = null){
        this.CreateRenderer(targetId);

        if(this.Canvas !== null){
            this.Settings = new Config(config);
            this.Grid = new Grid(this.Canvas, this.Settings.Grid);
            this.Triangles = [];
            this.RowMeta = [];
            this.Targets = {
                Row: null,
                Col: null
            };
            this.Mouse = {
                Down: false,
                X: 0,
                Y: 0
            };
            this.AnimationID = null;
            this.CreateTriangles(this.Settings.Gradient, this.Canvas);
            this.BindMouse();
            this.Draw();
        }
    }

    //method for guikding canvas element
    CreateRenderer(targetId){
        let el = document.getElementById(targetId);
        if(document.getElementById(targetId) !== null)
        {
            if(document.getElementById(targetId).tagName.toUpperCase() === 'CANVAS'){
                el.setAttribute('width', el.getBoundingClientRect().width * window.devicePixelRatio);
                el.setAttribute('height', el.getBoundingClientRect().height * window.devicePixelRatio);
                this.Canvas = el;
                this.Context = el.getContext('2d');
            }else{
                let canvas = document.createElement("canvas");
                canvas.id = "geometrize";
                canvas.setAttribute('width', el.getBoundingClientRect().width * window.devicePixelRatio);
                canvas.setAttribute('height', el.getBoundingClientRect().height * window.devicePixelRatio);
                el.appendChild(canvas);
                this.Canvas = canvas;
                this.Context = canvas.getContext('2d');
            }

            window.addEventListener('resize', () => {
                cancelAnimationFrame(this.AnimationID);
                this.Canvas.setAttribute('width', this.Canvas.parentElement.getBoundingClientRect().width * window.devicePixelRatio);
                this.Canvas.setAttribute('height', this.Canvas.parentElement.getBoundingClientRect().height * window.devicePixelRatio);
                this.Grid = null;
                this.Triangles = [];
                this.RowMeta = [];
                this.Grid = new Grid(this.Canvas, this.Settings.Grid);
                this.CreateTriangles(this.Settings.Gradient, this.Canvas);
                this.BindMouse(true);
                this.Draw();
            });
        }else{
            console.error("No target was found for the renderer. Check the id passed in.");
            this.Canvas = null;
            this.Context = null;
        }
    }

    MutateSettings(payload){
        cancelAnimationFrame(this.AnimationID);
        let results = this.Settings.ParseMutation(payload);
        if(results instanceof MutationResult && results.Success){
            cancelAnimationFrame(this.AnimationID);
            if(results.NeedsNewGrid){
                this.Grid = null;
                this.Grid = new Grid(this.Canvas, this.Settings.Grid);
            }

            if(results.NeedsNewTriangles){
                this.Triangles = [];
                this.RowMeta = [];
                this.CreateTriangles(this.Settings.Gradient, this.Canvas);
            }
        }
        this.BindMouse(true);
        this.Draw();
        return this.GetSettings();
    }

    GetSettings(){
        return this.Settings;
    }

    CreateTriangles(colourSettings, canvas){
        for(let r = 0; r < this.Grid.points.length-1; r++){
            let triangleRow = [], rowMinY = this.Grid.points[r][0].y, rowMaxY = this.Grid.points[r][0].y, rowMeta = new ArrayMeta(r);

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
            }

            rowMeta.AddMeta(MetaDataKeys.MIN_Y, rowMinY);
            rowMeta.AddMeta(MetaDataKeys.MAX_Y, rowMaxY);

            this.Triangles.push(triangleRow);
            this.RowMeta.push(rowMeta);
        }
    }

    DrawTriangles(){
        for(let tr = 0; tr < this.Triangles.length; tr++){
            this.Triangles[tr].forEach((t, i) => {
                this.Context.beginPath();
                this.Context.fillStyle = this.GetTriangleColour(t, tr, i);
                this.Context.moveTo(t.Point1.x, t.Point1.y);
                this.Context.lineTo(t.Point2.x, t.Point2.y);
                this.Context.lineTo(t.Point3.x, t.Point3.y);
                this.Context.fill();
            });
        }
    }

    GetTriangleColour(triangle, row, col){
        if(this.Settings.Effects.Click || this.Settings.Effects.Hover){
            if(this.Settings.Effects.Click && this.Mouse.Down){
                if(row === this.Targets.Row && col === this.Targets.Col){
                    return this.Settings.Effects.ActiveColour;
                }
            } else {
                if(this.Settings.Effects.Hover){
                    if(row === this.Targets.Row && col === this.Targets.Col){
                        return this.Settings.Effects.HoverColour;
                    }
                }
            }
        }

        return triangle.FillStyle;
    }

    BindMouse(isRestart = false){
        const listener = (e) => {
            this.Mouse.X = e.clientX * window.devicePixelRatio - this.Canvas.getBoundingClientRect().left;
            this.Mouse.Y = e.clientY * window.devicePixelRatio - this.Canvas.getBoundingClientRect().top;
        };

        const mouseTrigger = (e) => {
            if(e.button === 0){
                this.Mouse.Down = !this.Mouse.Down;
            }
        };

        if(isRestart){
            this.Canvas.removeEventListener('mousemove', listener);
            this.Canvas.removeEventListener('mousedown', mouseTrigger);
            this.Canvas.removeEventListener('mouseup', mouseTrigger);
        }

        this.Canvas.addEventListener('mousemove', listener);
        this.Canvas.addEventListener('mousedown', mouseTrigger);
        this.Canvas.addEventListener('mouseup', mouseTrigger);
    }

    Draw(){
        this.DrawTriangles();
        //see if mouse is in triangle
        if(this.Settings.Effects.Click || this.Settings.Effects.Hover){
            const testTriangle = (triangle) => {
                return this.Context.isPointInPath(triangle.GetPath(), this.Mouse.X, this.Mouse.Y);
            };
    
            let rowTargets = [], target = 0;
    
            for(let rmi = 0; rmi < this.RowMeta.length; rmi++)
            {
                if(this.RowMeta[rmi].GetMetaValue(MetaDataKeys.MIN_Y) != null && this.RowMeta[rmi].GetMetaValue(MetaDataKeys.MAX_Y) != null && this.RowMeta[rmi].GetMetaValue(MetaDataKeys.MIN_Y) <= this.Mouse.Y && this.RowMeta[rmi].GetMetaValue(MetaDataKeys.MAX_Y) > this.Mouse.Y){
                    rowTargets.push(this.RowMeta[rmi]);
                }
            }
    
            for(let rt = 0; rt < rowTargets.length; rt++){
                let rti = rowTargets[rt].GetMetaValue(MetaDataKeys.INDEX);
    
                for(let cti = 0; cti < this.Triangles[rti].length; cti++){
                    if(testTriangle(this.Triangles[rti][cti]))
                    {
                        target = 1;
                        this.Targets.Row = rti;
                        this.Targets.Col = cti;
                        break;
                    }
                }
    
                if(target !== 0){
                    break;
                }
            }
        
            if(target === 0){
                this.Targets.Row = null;
                this.Targets.Col = null;
            }
        }
    
        this.AnimationID = requestAnimationFrame(() => {this.Draw()});
    }

}
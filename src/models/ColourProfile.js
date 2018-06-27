import { helpers } from '../helpers';
import { Axis } from '../enums/Axis';
import { ColourChannelAssignments } from '../enums/ColourChannelAssignment';

export default class ColourProfile{

    constructor(min = 0, max = 255, direction = Axis.x, assignment = ColourChannelAssignments.RANDOM){
        this.SetMin(min);
        this.SetMax(max);
        this.SetAxis(direction);
        this.SetAssignment(assignment);
    }

    GetColour(coordMin, coordMax, canvas){

        let canvasSize = 0;

        if(this.Axis === Axis.X){
            canvasSize = getComputedStyle(canvas).getPropertyValue("width").slice(0,-2) * window.devicePixelRatio;
        }

        if(this.Axis === Axis.Y){
            canvasSize = getComputedStyle(canvas).getPropertyValue("height").slice(0,-2) * window.devicePixelRatio;
        }

        let perc = (helpers.getRandomInt(coordMin, coordMax)) / canvasSize;

        return Math.round(((this.Max - this.Min) * perc) + this.Min);
    }

    SetAxis(direction){
        if(String(direction).toLowerCase() === Axis.X || String(direction).toLowerCase() === Axis.Y || String(direction).toLowerCase() === Axis.Z){
            this.Axis = String(direction).toLowerCase();
        }
    }

    SetMax(max){
        if(typeof max === 'number' || typeof parseInt(max) === 'number'){
            this.Max = parseInt(max);
        }else{
            this.Max = 255;
        }
    }

    SetMin(min){
        if(typeof min === 'number' || typeof parseInt(min) === 'number'){
            this.Min = parseInt(min);
        }else{
            this.Min = 0;
        }
    }

    SetAssignment(assignment){
        this.Assignment = '';
        const self = this;

        Object.getOwnPropertyNames(ColourChannelAssignments).forEach(function(val, inx, arr){
            if(ColourChannelAssignments[val] === assignment && ColourChannelAssignments[val] !== ColourChannelAssignments.RANDOM && ColourChannelAssignments[val] !== ColourChannelAssignments.ALLOCATED){
                self.Assignment = ColourChannelAssignments[val];
            }

            if(ColourChannelAssignments[val] === assignment && ColourChannelAssignments[val] === ColourChannelAssignments.RANDOM){
                self.Assignment = ColourChannelAssignments.RANDOM;
            }
        });

        if(self.Assignment === ''){
            self.Assignment = ColourChannelAssignments.RANDOM;
            console.warn("No valid assignment for color profile. RANDOM has been set.");
        }
    }
}
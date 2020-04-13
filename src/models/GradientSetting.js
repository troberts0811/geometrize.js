import GradientDirection from '../enums/GradientDirection';
import ColourProfileProperty from '../enums/ColourProfileProperty';
import ColourProfile from './ColourProfile';
import helpers from '../helpers';

export default class GradientSetting{
    constructor(direction = GradientDirection.LINEAR_RIGHT, milestones = []){
        if(Object.values(GradientDirection).indexOf(direction.toLowerCase()) > -1){
            this.Direction = direction.toLowerCase();
        }else{
            this.Direction = GradientDirection.LINEAR_RIGHT;
        }

        if(milestones.length && milestones.every(milestone => milestone instanceof ColourProfile)){
            this.Milestones = milestones;
        } else{
            if(milestones.length && milestones.every(milestone => typeof milestone === 'object' && milestone.hasOwnProperty(ColourProfileProperty.HEX) && milestone.hasOwnProperty(ColourProfileProperty.POSITION))){
                this.Milestones = [];
                milestones.forEach(milestone => {
                    this.Milestones.push(new ColourProfile(milestone[ColourProfileProperty.HEX], milestone[ColourProfileProperty.POSITION]));
                });
            }else{
                this.Milestones = [new ColourProfile("", helpers.getRandomInt(0, 6)), new ColourProfile("", helpers.getRandomInt(40, 61)), new ColourProfile("", helpers.getRandomInt(95, 100))];
            }
        }

        this.Milestones.sort((a, b) =>  a.Position - b.Position);
    }

    GetColourForPoint(min, max, canvasSize){
        let lowerBoundMilestone = null, upperBoundMilestone = null, r = 0, g = 0, b = 0, perc = (helpers.getRandomInt(min, max)) / canvasSize;
        let lowerBoundArr = this.Milestones.filter(milestone => milestone.Position <= Math.round(perc * 100));
        let upperBoundArr = this.Milestones.filter(milestone => milestone.Position > Math.round(perc * 100));

        if(!lowerBoundArr.length && !upperBoundArr.length){
            //shouldn't get here but JIC
            console.error("There are no milestones to calculate the colour of a triangle. Below are milestones, lb and ub.");
            console.log([this.Milestones, lowerBoundArr, upperBoundArr]);
        }

        if(lowerBoundArr.length && upperBoundArr.length){
            lowerBoundMilestone = lowerBoundArr[lowerBoundArr.length - 1];
            upperBoundMilestone = upperBoundArr[0];
        }else{
            if(!lowerBoundArr.length){
                //no previous milestones so near beginning
                lowerBoundMilestone = upperBoundArr[0];
                upperBoundMilestone = upperBoundArr[0];
            }else{
                //no final milestones so near end
                lowerBoundMilestone = lowerBoundArr[lowerBoundArr.length - 1];
                upperBoundMilestone = lowerBoundArr[lowerBoundArr.length - 1];
            }
        }

        if(lowerBoundMilestone.Hex === upperBoundMilestone.Hex){
            //nothing is changing here
            let rgb = helpers.convertHexToRGBObject(lowerBoundMilestone.Hex);
            r =  rgb.R;
            g =  rgb.G;
            b =  rgb.B;
        }else{
            let start = helpers.convertHexToRGBObject(lowerBoundMilestone.Hex);
            let end = helpers.convertHexToRGBObject(upperBoundMilestone.Hex);
            let progress = (perc * 100 - lowerBoundMilestone.Position)/(upperBoundMilestone.Position - lowerBoundMilestone.Position);

            r = start.R + ((end.R - start.R) * progress);
            g = start.G + ((end.G - start.G) * progress);
            b = start.B + ((end.B - start.B) * progress);
        }

        return `rgb(${r},${g},${b})`;
    }
}
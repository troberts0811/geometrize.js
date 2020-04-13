import helpers from '../helpers';
import Axis from '../enums/Axis';

export default class ColourProfile{

    constructor(hex = "", position = null){
        this.Hex = "#000000";
        this.Position = 0;

        this.SetColour(hex);
        this.SetPosition(position);
    }

    SetColour(hex){
        if(hex.length && new RegExp("^#[0-9a-f]{6}$", "i").test(hex)){
            this.Hex = hex;
        }else{
            if(/rgb/i.test(hex)){
                this.Hex = helpers.convertRGBStringToHex(hex);
            }else{
                this.Hex = `#${helpers.covertNumberToHex(helpers.getRandomInt(0, 256))}${helpers.covertNumberToHex(helpers.getRandomInt(0, 256))}${helpers.covertNumberToHex(helpers.getRandomInt(0, 256))}`;
            }
        }
    }

    SetPosition(position){
        if(typeof position === "number" && position >= 0 && position <= 100){
            this.Position = position;
        }else{
            this.Position = helpers.getRandomInt(0, 101);
        }
    }
}
import helpers from '../helpers';

export default class EffectsSetting{
    constructor(hoverEffect = true, clickEffect = true, hoverColour = "#666666", activeColour = "#CC0000"){
        this.Hover = hoverEffect;
        this.Click = clickEffect;
        this.HoverColour = this.ConvertColour(hoverColour);
        this.ActiveColour = this.ConvertColour(activeColour);
    }

    ConvertColour(colour){
        if(colour.charAt(0) === "#" && new RegExp("^#[0-9a-f]{6}$", "i").test(colour)){
            let rgb = helpers.convertHexToRGBObject(colour);
            return `rgb(${rgb.R},${rgb.G},${rgb.B})`;
        }else{
            if(/rgb/i.test(colour)){
                return colour;
            }else{
                console.warn('Invalid colour put in for an effects colour. Switching to default #666666.');
                let rgb = helpers.convertHexToRGBObject('#666666');
                return `rgb(${rgb.R},${rgb.G},${rgb.B})`;
            }
        }
    }
}
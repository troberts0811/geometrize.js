import helpers from '../helpers';
import GradientSetting from './GradientSetting';
import ColourProfile from './ColourProfile';
import GridSetting from './GridSetting';
import Axis from '../enums/Axis';
import GradientProperty from '../enums/GradientProperty';
import ColourProfileProperty from '../enums/ColourProfileProperty';
import GridProperty from '../enums/GridProperty';
import EffectsProperty from '../enums/EffectsProperty';
import MutationResult from './MutationResult';
import EffectsSetting from './EffectsSetting';

export default class Config{
    constructor(config = null){
        if(config == null){
            this.Gradient = new GradientSetting();
            this.Grid = new GridSetting();
            this.Effects = new EffectsSetting();
        }else{
            this.Gradient = null;
            this.Grid = null;
            this.Effects = null;
            this.SetDefinedValues(config, this);
        }
    }
    
    SetDefinedValues(values, config, isOveride = true){
        let results = new MutationResult();

        const settingsIterator = (val, inx, arr) => {
            if(values.hasOwnProperty(val)){
                if(val === 'Gradient'){
                    let dir = config[val][GradientProperty.DIRECTION], stones = config[val][GradientProperty.MILESTONES];

                    if(values[val].hasOwnProperty(GradientProperty.DIRECTION)){
                        dir = values[val][GradientProperty.DIRECTION];
                    }

                    if(values[val].hasOwnProperty(GradientProperty.MILESTONES)){
                        stones = values[val][GradientProperty.MILESTONES];
                    }

                    config[val] = new GradientSetting(dir, stones);

                    results.NeedsNewTriangles = true;
                }
                if(val === 'Grid'){
                    let rows = config[val][GridProperty.ROWS], cols = config[val][GridProperty.COLUMNS], randomPercX = config[val][GridProperty.POSITIONRANDOMPERCENTAGEX], randomPercY = config[val][GridProperty.POSITIONRANDOMPERCENTAGEY];
                    
                    if(values[val].hasOwnProperty(GridProperty.ROWS)){
                        rows = values[val][GridProperty.ROWS];
                    }

                    if(values[val].hasOwnProperty(GridProperty.COLUMNS)){
                        cols = values[val][GridProperty.COLUMNS];
                    }

                    if(values[val].hasOwnProperty(GridProperty.POSITIONRANDOMPERCENTAGEX)){
                        randomPercX = values[val][GridProperty.POSITIONRANDOMPERCENTAGEX];
                    }

                    if(values[val].hasOwnProperty(GridProperty.POSITIONRANDOMPERCENTAGEY)){
                        randomPercY = values[val][GridProperty.POSITIONRANDOMPERCENTAGEY];
                    }

                    config[val] = new GridSetting(rows, cols, randomPercX, randomPercY);
                    results.NeedsNewGrid = true;
                    results.NeedsNewTriangles = true;
                }
                if(val === 'Effects'){
                    let hover = config[val][EffectsProperty.Hover], click = config[val][EffectsProperty.Click], hc = config[val][EffectsProperty.COLOUR_HOVER], ac = config[val][EffectsProperty.COLOUR_ACTIVE];

                    if(values[val].hasOwnProperty(EffectsProperty.Hover)){
                        hover = values[val][EffectsProperty.Hover];
                    }

                    if(values[val].hasOwnProperty(EffectsProperty.Click)){
                        click = values[val][EffectsProperty.Click];
                    }

                    if(values[val].hasOwnProperty(EffectsProperty.COLOUR_HOVER)){
                        hc = values[val][EffectsProperty.COLOUR_HOVER];
                    }

                    if(values[val].hasOwnProperty(EffectsProperty.COLOUR_ACTIVE)){
                        ac = values[val][EffectsProperty.COLOUR_ACTIVE];
                    }

                    config[val] = new EffectsSetting(hover, click, hc, ac);
                    results.NeedsNewTriangles = true;
                }
            }
        };

        if(isOveride){
            Object.getOwnPropertyNames(values).forEach(settingsIterator);
        }else{
            Object.getOwnPropertyNames(config).forEach(settingsIterator);
            results.Success = true;
            return results;
        }
    }

    ParseMutation(payload){
        return this.SetDefinedValues(payload, this, false);
    }
};
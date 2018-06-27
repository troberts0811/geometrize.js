import { helpers } from '../helpers';
import ColourChannelSetting from './ColourChannelSetting';
import ColourProfile from './ColourProfile';
import GridSetting from './GridSetting';
import { Axis } from '../enums/Axis';
import { ColourChannelAssignments } from '../enums/ColourChannelAssignment';

export default class Config{
    constructor(canvas){
        this.ColourChannelSettings = new ColourChannelSetting(ColourChannelAssignments.RANDOM, [
            new ColourProfile(30, 255, Axis.X, ColourChannelAssignments.RANDOM), 
            new ColourProfile(30, helpers.getRandomInt(145, 185), Axis.X, ColourChannelAssignments.RANDOM),
            new ColourProfile(30, helpers.getRandomInt(55, 90), Axis.Y, ColourChannelAssignments.RANDOM)
        ]);
        this.Grid = new GridSetting(canvas);
    }
};
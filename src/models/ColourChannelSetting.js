import { ColourChannelAssignments } from '../enums/ColourChannelAssignment';
import { helpers } from '../helpers';

export default class ColourChannelSetting{
    constructor(assignment, profiles){
        this.SetAssignment(assignment, profiles);
    }

    SetAssignment(assignment, profiles){
        this.R = null;
        this.G = null;
        this.B = null;

        if(assignment === ColourChannelAssignments.ALLOCATED){
            if(typeof profiles === 'object' && profiles.length){
                for(var cp = 0; cp < profiles.length; cp++){
                    let prof = profiles[cp];
                    if(prof.Assignment === ColourChannelAssignments.R){
                        this.R = prof;
                    }

                    if(prof.Assignment === ColourChannelAssignments.G){
                        this.G = prof;
                    }

                    if(prof.Assignment === ColourChannelAssignments.B){
                        this.B = prof;
                    }
                }

                if(this.R === null || this.G === null || this.B === null){
                    console.warn("Colour Channel Assignment mode is ALLOCATED but not all 3 channels have an assigned profile.\nSetting the profile assignment mode to RANDOM.");

                    if(this.R === null){
                        console.warn("The Red Channel does not have an allocated profile");
                    }

                    if(this.B === null){
                        console.warn("The Blue Channel does not have an allocated profile");
                    }

                    if(this.G === null){
                        console.warn("The Green Channel does not have an allocated profile");
                    }

                    let channelSettingIndex = helpers.getRandomInt(0, 3);

                    this.R = profiles[channelSettingIndex];
                    profiles.splice(channelSettingIndex, 1);

                    channelSettingIndex = helpers.getRandomInt(0, 2);
                    this.G = profiles[channelSettingIndex];
                    profiles.splice(channelSettingIndex, 1);
                    this.B = profiles[0];

                }
            }else{
                console.error("Invalid parameter type for colour profiles. It needs to be a non empty array.")
            }
        }else{
            if(assignment !== ColourChannelAssignments.RANDOM){
                console.warn("No valid colour channel assignment assigned. Defaulting to RANDOM.");
            }
            let channelSettingIndex = helpers.getRandomInt(0, 3);

            this.R = profiles[channelSettingIndex];
            profiles.splice(channelSettingIndex, 1);

            channelSettingIndex = helpers.getRandomInt(0, 2);
            this.G = profiles[channelSettingIndex];
            profiles.splice(channelSettingIndex, 1);
            this.B = profiles[0];
        }
    }

    SetProfiles(profiles){

    }
}
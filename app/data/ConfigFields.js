import Axis from 'geometrize/enums/Axis';
import GradientDirection from 'geometrize/enums/GradientDirection';
import GradientProperty from 'geometrize/enums/GradientProperty';
import ColourProfileProperty from 'geometrize/enums/ColourProfileProperty';
import GridProperty from 'geometrize/enums/GridProperty';
import EffectsProperty from 'geometrize/enums/EffectsProperty';

export const ConfigFields = [
    {
        model: "Gradient",
        displayName: "Gradient Settings",
        fields:[
            {
                name: GradientProperty.DIRECTION,
                type: "string",
                objectName: "",
                displayName: "Direction",
                options: [GradientDirection.LINEAR_LEFT, GradientDirection.LINEAR_RIGHT, GradientDirection.LINEAR_TOP, GradientDirection.LINEAR_BOTTOM],
                isInteger: false,
                min: 0,
                max: 0,
                isEditable: true,
                rules:[]
            },
            {
                name: GradientProperty.MILESTONES,
                type: "gradient",
                objectName: "",
                displayName: "Milestones",
                options: [],
                isInteger: false,
                min: 0,
                max: 0,
                isEditable: true,
                rules:[]
            }
        ]
    },
    {
        model: "ColourProfile",
        fields:[
            {
                name: ColourProfileProperty.HEX,
                type: "color",
                objectName: "",
                displayName: "Hex Code",
                options: [],
                min: 0,
                max: 100,
                isInteger: false,
                isEditable: true,
                rules:[]
            },
            {
                name: ColourProfileProperty.POSITION,
                type: "number",
                objectName: "",
                displayName: "Position",
                options: [],
                min: 0,
                max: 100,
                isInteger: true,
                isEditable: true,
                rules:[
                    function(val, model){
                        if(model["Min"] <= val){
                            return true;
                        } else{
                            return false;
                        }
                    },
                    function(val, model){
                        if(model["Max"] <= val){
                            return true;
                        } else{
                            return false;
                        }
                    }
                ]
            }
        ]
    },
    {
        model:"Effects",
        fields:[
            {
                name: EffectsProperty.Hover,
                type: "checkbox",
                objectName: "",
                displayName: "Hover",
                options: [],
                min: 0,
                max: null,
                isInteger: false,
                isEditable: false,
                rules:[]
            },
            {
                name: EffectsProperty.Click,
                type: "checkbox",
                objectName: "",
                displayName: "Click",
                options: [],
                min: 0,
                max: null,
                isInteger: false,
                isEditable: false,
                rules:[]
            },
            {
                name: EffectsProperty.COLOUR_HOVER,
                type: "color",
                objectName: "",
                displayName: "Hover Colour",
                options: [],
                isInteger: false,
                min: 0,
                max: 0,
                isEditable: true,
                rules:[]
            },
            {
                name: EffectsProperty.COLOUR_ACTIVE,
                type: "color",
                objectName: "",
                displayName: "Click Colour",
                options: [],
                isInteger: false,
                min: 0,
                max: 0,
                isEditable: true,
                rules:[]
            }
        ]
    },
    {
        model: "Grid",
        fields:[
            {
                name: GridProperty.ROWS,
                type: "number",
                objectName: "",
                displayName: "No of Rows",
                options: [],
                min: 1,
                max: null,
                isInteger: true,
                isEditable: true,
                rules:[]
            },
            {
                name: GridProperty.COLUMNS,
                type: "number",
                objectName: "",
                displayName: "No of Columns",
                options: [],
                min: 1,
                max: null,
                isInteger: true,
                isEditable: true,
                rules:[]
            },
            {
                name: GridProperty.POSITIONRANDOMPERCENTAGEX,
                type: "number",
                objectName: "",
                displayName: "X Position Spread %",
                options: [],
                min: 0,
                max: 50,
                isInteger: false,
                isEditable: true,
                rules:[]
            },
            {
                name: GridProperty.POSITIONRANDOMPERCENTAGEY,
                type: "number",
                objectName: "",
                displayName: "Y Position Spread %",
                options: [],
                min: 0,
                max: 50,
                isInteger: false,
                isEditable: true,
                rules:[]
            }
        ]
    }
];
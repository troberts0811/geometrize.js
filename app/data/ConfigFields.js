import { Axis } from 'geometrize/enums/Axis';
import { ColourChannelAssignments as Assignments } from 'geometrize/enums/ColourChannelAssignment';

export const ConfigFields = [
    {
        model: "ColourChannelSettings",
        displayName: "Colour Channel Settings",
        fields:[
            {
                name: "R",
                type: "object",
                objectName: "ColourProfile",
                displayName: "Red Channel",
                options: [],
                isInteger: false,
                min: 0,
                max: 0,
                isEditable: true,
                rules:[]
            },
            {
                name: "G",
                type: "object",
                objectName: "ColourProfile",
                displayName: "Green Channel",
                options: [],
                min: 0,
                max: 0,
                isInteger: false,
                isEditable: true,
                rules:[]
            },
            {
                name: "B",
                type: "object",
                objectName: "ColourProfile",
                displayName: "Blue Channel",
                options: [],
                min: 0,
                max: 0,
                isInteger: false,
                isEditable: true,
                rules:[]
            }
        ]
    },
    {
        model: "ColourProfile",
        fields:[
            {
                name: "Min",
                type: "number",
                objectName: "",
                displayName: "Minimum",
                options: [],
                min: 0,
                max: 255,
                isInteger: true,
                isEditable: true,
                rules:[
                    function(val, model){
                        if(model["Max"] <= val){
                            return true;
                        } else{
                            return false;
                        }
                    }
                ]
            },
            {
                name: "Max",
                type: "number",
                objectName: "",
                displayName: "Maximum",
                options: [],
                min: 0,
                max: 255,
                isInteger: true,
                isEditable: true,
                rules:[
                    function(val, model){
                        if(model["Min"] <= val){
                            return true;
                        } else{
                            return false;
                        }
                    }
                ]
            },
            {
                name: "Axis",
                type: "string",
                objectName: "",
                displayName: "Axis",
                options: [Axis.X, Axis.Y],
                min: 0,
                max: 0,
                isInteger: true,
                isEditable: true,
                rules:[]
            },
            {
                name: "Assignment",
                type: "string",
                objectName: "",
                displayName: "Assignment Mode",
                options: [Assignments.RANDOM, Assignments.R, Assignments.G, Assignments.B],
                min: 0,
                max: 0,
                isInteger: true,
                isEditable: true,
                rules:[]
            }
        ]
    },
    {
        model: "Grid",
        fields:[
            {
                name: "Width",
                type: "number",
                objectName: "",
                displayName: "Width",
                options: [],
                min: 0,
                max: null,
                isInteger: true,
                isEditable: false,
                rules:[]
            },
            {
                name: "Height",
                type: "number",
                objectName: "",
                displayName: "Height",
                options: [],
                min: 0,
                max: null,
                isInteger: true,
                isEditable: false,
                rules:[]
            },
            {
                name: "Rows",
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
                name: "Columns",
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
                name: "PositionRandomPercentageX",
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
                name: "PositionRandomPercentageY",
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
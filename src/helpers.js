const helpers = {
    getRandomInt: function(min, max){
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    },
    getRandomNo: function(min, max){
        return Math.random() * (max - min) + min;
    },
    covertNumberToHex: function(num){
        const decToHex = (dec) => {
            switch(dec){
                case 0: return '0';
                case 1: return '1';
                case 2: return '2';
                case 3: return '3';
                case 4: return '4';
                case 5: return '5';
                case 6: return '6';
                case 7: return '7';
                case 8: return '8';
                case 9: return '9';
                case 10: return 'A';
                case 11: return 'B';
                case 12: return 'C';
                case 13: return 'D';
                case 14: return 'E';
                case 15: return 'F';
            }
        }
        var firstPart = Math.floor(num/16);
        var secondPart = num - (firstPart * 16);

        return `${decToHex(firstPart)}${decToHex(secondPart)}`;
    },
    convertHexToDecimal: function(hex){
        const hexToDec = (hex) => {
            switch(hex){
                case '0': return 0;
                case '1': return 1;
                case '2': return 2;
                case '3': return 3;
                case '4': return 4;
                case '5': return 5;
                case '6': return 6;
                case '7': return 7;
                case '8': return 8;
                case '9': return 9;
                case 'A': return 10;
                case 'B': return 11;
                case 'C': return 12;
                case 'D': return 13;
                case 'E': return 14;
                case 'F': return 15;
            }
        };

        let total = 0;

        for(let i = 0; i < hex.length; i++){
            total += (hexToDec(hex.charAt(i).toUpperCase()) * (16 * (1 - i)));
        }

        return total;
    },
    convertHexToRGBObject: function(hex){
        const rgx = new RegExp('[^#]{2}','g');
        const getChannel = (inx) => {
            switch (inx){
                case 0: return 'R';
                case 1: return 'G';
                case 2: return 'B';
                default: return `${inx}`;
            }
        };

        let obj = {}, it = 0, results;

        while ((results = rgx.exec(hex)) !== null) {
            obj[getChannel(it)] = this.convertHexToDecimal(results[0]);
            it++;
        }

        return obj;
    },
    convertRGBObjectToHex: function(rgbObj){
        return `#${this.covertNumberToHex(rgbObj.R)}${this.covertNumberToHex(rgbObj.G)}${this.covertNumberToHex(rgbObj.B)}`;
    },
    convertRGBStringToHex: function(rgb){
        const rgbRegExp = new RegExp(/rgb\((.*)\)/);
        let string = "#";
        if(rgbRegExp.test(rgb)){
            rgb.replace(rgbRegExp, '$1').replace(/\ /g, "").split(",").forEach(colour => {
                string += this.covertNumberToHex(colour);
            });
            return string;
        }else{
            return "#000000";
        }
    }
};

export default helpers;
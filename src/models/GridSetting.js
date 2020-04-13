export default class GridSetting{

    constructor(rows = 30, columns = 36, randomPercX = 33.33, randomPercY = 33.33){

        this.SetRows(rows);
        this.SetColumns(columns);
        this.SetRandomicityX(randomPercX);
        this.SetRandomicityY(randomPercY);
    }

    SetRows(qty){
        if(typeof qty === 'number'){
            if(Number.isInteger(qty)){
                this.Rows = qty;
            }else{
                this.Rows = parseInt(qty.toFixed(0), 10);
            }
        }else{
            if(typeof qty === 'string' && !isNaN(parseInt(qty))){
                this.Rows = parseInt(qty);
            }else{
                console.warn("Invalid row count passed into grid settings. Setting to default of 30.");
                this.Rows = 30;
            }
        }
    }

    SetColumns(qty){
        if(typeof qty === 'number'){
            if(Number.isInteger(qty)){
                this.Columns = qty;
            }else{
                this.Columns = parseInt(qty.toFixed(0), 10);
            }
        }else{
            if(typeof qty === 'string' && !isNaN(parseInt(qty))){
                this.Columns = parseInt(qty);
            }else{
                console.warn("Invalid column count passed into grid settings. Setting to default of 36.");
                this.Columns = 36;
            }
        }
    }

    SetRandomicityX(amount){
        if(typeof amount === 'number'){
            this.PositionRandomPercentageX = amount;
        }else{
            this.PositionRandomPercentageX = 33.33;
        }
    }

    SetRandomicityY(amount){
        if(typeof amount === 'number'){
            this.PositionRandomPercentageY = amount;
        }else{
            this.PositionRandomPercentageY = 33.33;
        }
    }
}
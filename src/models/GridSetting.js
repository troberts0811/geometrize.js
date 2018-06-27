export default class GridSetting{

    constructor(canvas, rows = 30, columns = 36, randomPercX = 33.33, randomPercY = 33.33){

        this.SetSize(canvas);
        this.SetRows(rows);
        this.SetColumns(columns);
        this.SetRandomicityX(randomPercX);
        this.SetRandomicityY(randomPercY);
    }

    SetColumns(qty){
        if(typeof qty === 'number' || typeof parseInt(qty) === 'number'){
            this.Columns = parseInt(qty);
        }else{
            this.Columns = 36;
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

    SetRows(qty){
        if(typeof qty === 'number' || typeof parseInt(qty) === 'number'){
            this.Rows = parseInt(qty);
        }else{
            this.Rows = 30;
        }
    }

    SetSize(canvas){
        if(typeof canvas !== 'undefined'){
            this.Width = canvas.clientWidth * window.devicePixelRatio;
            this.Height = canvas.clientHeight * window.devicePixelRatio;
        }else{
            this.Width = window.innerWidth * window.devicePixelRatio;
            this.Height = window.innerHeight * window.devicePixelRatio;
        }
    }
}
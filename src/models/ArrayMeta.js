import Keys from '../enums/MetaDataKeys';

export default class ArrayMeta{
    constructor(index){
        this.Data = {};
        this.AddMeta(Keys.INDEX, index);
    }

    KeyExits(key){
        return this.Data.hasOwnProperty(key);
    }

    AddMeta(key, val){
        this.Data[key] = val;
    }

    GetMetaValue(key){
        if(this.KeyExits(key)){
            return this.Data[key];
        }else{
            return null;
        }
    }

    RemoveMeta(key){
        delete this.Data[key];
    }
}
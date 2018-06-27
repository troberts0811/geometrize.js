export default class ArrayMeta{
    constructor(){
        this.Data = {};
    }

    KeyExits(key){
        return this.Data.hasOwnProperty(key);
    }

    AddMeta(key, val){
        this.Data[key] = val;
    }

    GetMetaValue(key){
        return this.Data[key];
    }

    RemoveMeta(key){
        delete this.Data[key];
    }
}
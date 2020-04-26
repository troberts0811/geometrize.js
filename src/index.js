import GeometrizeClass from './models/Geometrize'; 

function Geometrize(id, config){
    return new GeometrizeClass(id, config);
}

module.exports = Geometrize;
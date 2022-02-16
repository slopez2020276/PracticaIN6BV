const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CursosSchema = Schema({
    nombreCurso: String,
    idMaestro: {type: Schema.Types.ObjectId, ref:'usarios'}
        
    })

    module.exports =mongoose.model('Cursos', CursosSchema)
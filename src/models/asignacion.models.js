const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const asignacionSchema = Schema({

    idAlumno: {type: Schema.Types.ObjectId, ref:'usuarios'},
    idCurso: {type: Schema.Types.ObjectId, ref: 'Cursos'},
    
})

module.exports =mongoose.model('Aasignacion', asignacionSchema)


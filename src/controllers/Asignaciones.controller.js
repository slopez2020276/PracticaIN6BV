const Asignacion = require('../models/asignacion.models');
const jwt = require('../services/jwt');

function agregarAsignacion (req, res) {
    var parametros = req.body;
    var modeloAsignacion = new Asignacion;

   
        modeloAsignacion.idAlumno = parametros.idAlumno;
        modeloAsignacion.idCurso = parametros.idCurso;


        modeloAsignacion.save((err, AsignacionGuardada) => {
            if(err) return res.status(500).send({message:'error en la peticon'});
            if(!AsignacionGuardada) return res.status(500).send({message:'error al guardar la Asignacion'})

            return res.status(200).send({asignacion:AsignacionGuardada});
        
        }) 


    
    } 

 


   


module.exports={

    agregarAsignacion
}




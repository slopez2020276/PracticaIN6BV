const Curso = require('../models/cursos.models')

function AgregarCurso(req, res){
    var parametro = req.body;
    var modelCurso = new Curso;

    if(parametro.nombre){
        modelCurso.nombreCurso = parametro.nombre;
        modelCurso.idMaestro = req.user.sub;

        if( req.user.rol !== 'Maestro') {
            return res.status(500).send({ mensaje: 'No tiene los permisos para editar este Curso.' });
        }


        modelCurso.save((err, CursoGuardado) => {
            if(err) return res.status(500).send({message:'error en la peticon'});
            if(!CursoGuardado) return res.status(500).send({message:'error al guardar el Curso'})

            return res.status(200).send({curso:CursoGuardado});
        
        }) 

    

    }else{
        return res.status(500).send({message:'debe ingresar los parametros obligatorios'})
    } 

    

}


function EditarCurso(req, res) {
    var idCurso = req.params.idCu;
    var parametros = req.body;

    if( req.user.rol !== 'Maestro') {
        return res.status(500).send({ mensaje: 'No tiene los permisos para editar este Curso.' });
    }
    Curso.findByIdAndUpdate(idCurso, parametros, {new: true}, (err, cursoEditado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en  la peticion'});
        if(!cursoEditado) return res.status(500).send({mensaje: 'Error al editar el Usuario'});

        return res.status(200).send({ curso: cursoEditado });
    })
}



function EliminarCurso(req, res) {
    var id = req.params.idCursos;
    if(req.user.rol !== 'Maestro' ) {
        return res.status(500).send({ mensaje: 'No tiene los permisos para eliminar este Curso.' });
    }else{
    Curso.findByIdAndDelete(id, (err, cursoEliminado) => {
      if (err) return res.status(500).send({ mensaje: "Error en la peticion" });
      if (!cursoEliminado)
        return res.status(500).send({ mensaje: "Error al eliminar el usuario" });
        return res.status(200).send({ curso: cursoEliminado });
    });
}
}



module.exports ={
    AgregarCurso,
    EditarCurso,
    EliminarCurso
}
const Usuario = require('../models/usario.models');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');

function RegistrarMaestro (req, res) {

    var parametros = req.body;
    var modeloUsuario = new Usuario();

    if(parametros.nombre &&  parametros.email) {
            Usuario.find({ email : parametros.email }, (err, usuarioEncontrados) => {
                if ( usuarioEncontrados.length > 0 ){ 
                    return res.status(500)
                        .send({ mensaje: "Este correo ya se encuentra utilizado" })
                } else {
                    modeloUsuario.nombre = parametros.nombre;
                    
                    modeloUsuario.email = parametros.email;

                   modeloUsuario.password ='123456';

                

                    modeloUsuario.rol = 'Maestro';
                   

                    

                    bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada) => {
                        modeloUsuario.password = passwordEncriptada;

                        modeloUsuario.save((err, usuarioGuardado)=>{
                            if(err) return res.status(500)
                                .send({ mensaje : 'Error en la peticion' })
                            if(!usuarioGuardado) return res.status(500)
                                .send({ mensaje: 'Error al guardar el Maestro' })
    
                            return res.status(200).send({ usuario: usuarioGuardado})
                        })
                    })                    
                }
            })
    } else {
        return res.status(404)
            .send({ mensaje : 'Debe ingresar los parametros obligatorios'})
    }


}

function RegistrarAlumno (req, res) {

    var parametros = req.body;
    var modeloUsuario = new Usuario();

    if(parametros.nombre &&  parametros.email) {
            Usuario.find({ email : parametros.email }, (err, usuarioEncontrados) => {
                if ( usuarioEncontrados.length > 0 ){ 
                    return res.status(500)
                        .send({ mensaje: "Este correo ya se encuentra utilizado" })
                } else {
                    modeloUsuario.nombre = parametros.nombre;
                    
                    modeloUsuario.email = parametros.email;

                    modeloUsuario.password = parametros.password;

                    modeloUsuario.rol = "Usuario";
                   
                    

                    bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada) => {
                        modeloUsuario.password = passwordEncriptada;

                        modeloUsuario.save((err, usuarioGuardado)=>{
                            if(err) return res.status(500)
                                .send({ mensaje : 'Error en la peticion' })
                            if(!usuarioGuardado) return res.status(500)
                                .send({ mensaje: 'Error al guardar el Usuario' })
    
                            return res.status(200).send({ usuario: usuarioGuardado})
                        })
                    })                    
                }
            })
    } else {
        return res.status(404)
            .send({ mensaje : 'Debe ingresar los parametros obligatorios'})
    }


}


function Login(req, res) {
    var parametros = req.body;
    
    Usuario.findOne({ email : parametros.email }, (err, usuarioEncontrado) => {
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion'});
        if (usuarioEncontrado){

            bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada) => {
                usuarioEncontrado.password = passwordEncriptada;

                usuarioEncontrado.save((err, usuariosGuardados)=>{
                    if(err) return res.status(500).send({ mensaje : 'Error en la peticion' })
                    if(!usuariosGuardados) return res.status(500).send({ mensaje: 'Error al guardar el Usuario' })

                    return res.status(200).send({ token: jwt.crearToken(usuarioEncontrado)})
                })
            })
        } else {
            return res.status(500)
                .send({ mensaje: 'El usuario, no se ha podido identificar'})
        }
    })
}



function editarUsario (req, res){
    var usuarioid = req.params.idUsario;
    var parametros = req.body;

    if(req.user.sub !== usuarioid){
        return res.status(500).send({ mensaje:"no tiene permisos para editar"})

        }
    Usuario.findByIdAndUpdate(req.user.sub,parametros,{new:true},(err, usuarioEditado)=>{
        if(err) return res.status(500).send({ mensaje : 'Error en la peticion'});
        if(!usuarioEditado) return res.status(500).send({ mensaje:'error al editar el usario'})

        return res.status(200).send({usario: usuarioEditado})

    })

  

}

function eliminarUsario(req, res){
 

        var id = req.params.idUsuario;
        if(req.user.sub !== id ) {
            return res.status(500).send({ mensaje: 'No tiene los permisos para eliminar este Usuario.' });
        }else{
        Usuario.findByIdAndDelete(id, (err, usuarioEliminado) => {
          if (err) return res.status(500).send({ mensaje: "Error en la peticion" });
          if (!usuarioEliminado)
            return res.status(500).send({ mensaje: "Error al eliminar el Usario" });
            return res.status(200).send({ curso: usuarioEliminado });
        });
    }
    }






module.exports={
    RegistrarAlumno,
    RegistrarMaestro,
    Login,
    editarUsario,
    eliminarUsario
}
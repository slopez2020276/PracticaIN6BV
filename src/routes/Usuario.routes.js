const express = require('express');
const controladorUsuario = require('../controllers/Usuario.controller');
const md_autenticacion= require('../middlewares/autenticacion');


const api = express.Router();

api.post('/registrarMaestro', controladorUsuario.RegistrarMaestro);
api.post('/registrarAlumno', controladorUsuario.RegistrarAlumno);
api.post('/login', controladorUsuario.Login);
api.put('/editarUsario/:idUsario',md_autenticacion.Auth,controladorUsuario.editarUsario);
api.delete('/eliminarUsario/:idUsuario', md_autenticacion.Auth, controladorUsuario.eliminarUsario);

module.exports =api;

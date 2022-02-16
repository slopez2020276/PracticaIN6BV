const express = require('express');
const controladorCurso = require('../controllers/Curso.controller');
const md_autenticacion = require('../middlewares/autenticacion');


const api = express.Router();

api.post('/agregarCurso',md_autenticacion.Auth, controladorCurso.AgregarCurso);
api.put('/editarCurso/:idCu', md_autenticacion.Auth, controladorCurso.EditarCurso);
api.delete('/eliminarCurso/:idCursos', md_autenticacion.Auth, controladorCurso.EliminarCurso);
module.exports = api;
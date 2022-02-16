const express= require('express');
const  controladorAsignacion = require('../controllers/Asignaciones.controller');
const md_autenticacion = require('../middlewares/autenticacion');

const api = express.Router();

api.post('/agregarAsignacion',controladorAsignacion.agregarAsignacion);

module.exports=api;


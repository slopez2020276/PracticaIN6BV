const express = require('express');
const cors = require('cors');
const app = express();

// IMPORTACION RUTAS
const cursosRoutes = require('./src/routes/Curso.routes');
const usuarioRoutes = require('./src/routes/Usuario.routes');
const asignacionRoutes= require('./src/routes/asignacion.routes');

// MIDDLEWARES
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// CABECERAS
app.use(cors());

// CARGA DE RUTAS localhost:3000/api/productos
app.use('/api', cursosRoutes, usuarioRoutes, asignacionRoutes);

module.exports = app;
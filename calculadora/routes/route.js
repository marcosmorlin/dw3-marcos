const route = require('./route/route');
const express = require("express");
const routerApp = express.Router();

const fCalculo = require("../controller/calculadora");

routerApp.post("/calcular", fCalculo);

module.exports = routerApp;

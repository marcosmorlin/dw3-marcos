## arquivo: routes/route.js
2
3 //@ Importa as bibliotecas e arquivos
4 const express = require("express");
5 const routerApp = express.Router();
6 const appHello = require("../controller/ctlHello");
7
8 //@ Configura as rotas
9 routerApp.get("/", appHello.hello);
10 routerApp.post("/helloUser", appHello.helloUser);
11
12 //@ Exporta a variável com as rotas
13 module.exports = routerApp;
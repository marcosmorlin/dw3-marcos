## arquivo: app.js
2
3 //@ Importa as bibliotecas e arquivos
4 const express = require("express");
5 const router = require("./routes/route");
6
7 //@ Configura o servidor
8 const app = express();
9 const port = 40000;
10 app.use(express.json());
11 app.use(router);
12
13 //@ Inicia o servidor
14 app.listen(port, () => {
15 console.log("App listening at port ${port}")
16 })
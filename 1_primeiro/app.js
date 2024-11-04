//@ Importa as bibliotecas
2 const express = require("express");
3 require("dotenv").config();
4
5 //@ Configura o servidor
6 const app = express();
7 const port = process.env.PORT;
8
9 //@ Cria uma rota para o endereço raiz.
10 app.get("/", (req, res) => {
11 res.send("Hello DW3!")
12 })
13
14 //@ Inicia o servidor
15 app.listen(port, () => {
16 console.log("Executando a aplicação:" , process.env.APP_NAME);
17 console.log("Example app listening on port:", port);
18 })
<<<<<<< HEAD
const express = require('express')
require('dotenv').config();

const app = express();
const port = process.env.PORT;

//@ Cria uma rota para o raiz
app.get('/', (req, res) => {
  res.send('Hello DW3!')
})

app.listen(port, () => {
  console.log('Executando a aplicação ' , process.env.APP_NAME);
  console.log('Example app listening on port ', port);
})
=======
//@ Importa as bibliotecas
2 const express = require("express")
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
16  console.log("Executando a aplicação:" , process.env.APP_NAME);
17  console.log("Example app listening on port:", port);
18 })
>>>>>>> b15f9c093410c00132cfdebb750ac24a7a55bf80

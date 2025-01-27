const express = require("express");
const routerApp = express.Router();

const appAutores = require("../apps/Autores/Controller/ctlAutores");
const appEmprestimos = require("../apps/Emprestimos/Controller/ctlEmprestimos");
const appUsuarios = require("../apps/Usuarios/Controller/ctlUsuarios");
const appLivros= require("../apps/Livros/controller/ctlLivros");
const appLogin = require("../apps/Login/controller/ctlLogin");

// middleware that is specific to this router
routerApp.use((req, res, next) => {
  next();
});

routerApp.get("/", (req, res) => {
  res.send("Olá mundo!");
});

//Rotas de Autores
routerApp.get("/getAllAutores", appLogin.AutenticaJWT, appAutores.GetAllAutores);
routerApp.post("/getAutorByID", appLogin.AutenticaJWT, appAutores.GetAutorByID);
routerApp.post("/insertAutores", appLogin.AutenticaJWT, appAutores.InsertAutores);
routerApp.post("/updateAutores", appLogin.AutenticaJWT, appAutores.UpdateAutores);
routerApp.post("/DeleteAutores", appLogin.AutenticaJWT, appAutores.DeleteAutores);

//Rotas de Emprestimos
routerApp.get("/GetAllEmprestimos", appLogin.AutenticaJWT, appEmprestimos.getAllEmprestimos);
routerApp.post("/GetEmprestimoByID", appLogin.AutenticaJWT, appEmprestimos.getEmprestimoByID);
routerApp.post("/InsertEmprestimos", appLogin.AutenticaJWT, appEmprestimos.insertEmprestimos);
routerApp.post("/UpdateEmprestimos", appLogin.AutenticaJWT, appEmprestimos.updateEmprestimos);
routerApp.post("/DeleteEmperstimos", appLogin.AutenticaJWT, appEmprestimos.DeleteEmprestimos);

//Rotas de Usuarios
routerApp.get("/GetAllUsuarios", appLogin.AutenticaJWT, appUsuarios.getALLUsuarios);
routerApp.post("/GetUsuarioByID", appLogin.AutenticaJWT, appUsuarios.getUsuarioById);
routerApp.post("/InsertUsuario", appLogin.AutenticaJWT, appUsuarios.InsertUsuarios);
routerApp.post("/UpdateUsuario", appLogin.AutenticaJWT, appUsuarios.UpdateUsuarios);
routerApp.post("/DeleteUsuario", appLogin.AutenticaJWT, appUsuarios.DeleteUsuarios);

//Rotas de Livros
routerApp.get("/GetAllLivros", appLogin.AutenticaJWT, appLivros.getALLLivros);
routerApp.post("/GetLivroByID", appLogin.AutenticaJWT, appLivros.getLivrosById);
routerApp.post("/InsertLivros", appLogin.AutenticaJWT, appLivros.insertLivros);
routerApp.post("/UpdateLivros", appLogin.AutenticaJWT, appLivros.UpdateLivros);
routerApp.post("/DeleteLivros", appLogin.AutenticaJWT, appLivros.DeleteLivros);

// Rota Login
routerApp.post("/Login", appLogin.Login);
routerApp.post("/Logout", appLogin.Logout);

module.exports = routerApp;

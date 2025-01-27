var express = require('express');
var router = express.Router();
var menuUsuarioApp = require("../apps/MenuUsuario/controller/ctlMenuUsuario");

// Função necessária para evitar que usuários não autenticados acessem o sistema.
function authenticationMiddleware(req, res, next) {
    // Verificar se existe uma sessão válida.
    isLogged = req.session.isLogged;    
    
    if (!isLogged) {      
      res.redirect("/Login");
    }
    next();
};

/* GET métodos */
router.get('/ManutMenuUsuario', authenticationMiddleware, menuUsuarioApp.ManutMenuUsuario);
router.get('/ViewMenuUsuario/:id', authenticationMiddleware, menuUsuarioApp.viewMenuUsuario);
router.get('/InsertMenuUsuario', authenticationMiddleware, menuUsuarioApp.insertMenuUsuario);
router.get('/UpdateMenuUsuario/:id', authenticationMiddleware, menuUsuarioApp.updateMenuUsuario);

/* POST métodos */
router.post('/InsertMenuUsuario', authenticationMiddleware, menuUsuarioApp.insertMenuUsuario);
router.post('/UpdateMenuUsuario', authenticationMiddleware, menuUsuarioApp.updateMenuUsuario);
router.post('/DeleteMenuUsuario', authenticationMiddleware, menuUsuarioApp.deleteMenuUsuario);

module.exports = router;

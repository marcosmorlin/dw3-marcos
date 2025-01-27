var express = require('express');
var router = express.Router();
var menuApp = require("../apps/Menu/controller/ctlMenu");

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
router.get('/ManutMenu', authenticationMiddleware, menuApp.ManutMenu);
router.get('/InsertMenu', authenticationMiddleware, menuApp.insertMenu);
router.get('/ViewMenu/:id', authenticationMiddleware, menuApp.viewMenu);
router.get('/UpdateMenu/:id', authenticationMiddleware, menuApp.updateMenu);

/* POST métodos */
router.post('/InsertMenu', authenticationMiddleware, menuApp.insertMenu);
router.post('/UpdateMenu', authenticationMiddleware, menuApp.updateMenu);
router.post('/DeleteMenu', authenticationMiddleware, menuApp.deleteMenu);

module.exports = router;

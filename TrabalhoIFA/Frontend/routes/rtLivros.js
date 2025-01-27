var express = require('express');
var router = express.Router();
var livrosApp = require("../apps/Livros/controller/cltLivros")



//Função necessária para evitar que usuários não autenticados acessem o sistema.
function authenticationMiddleware(req, res, next) {
    // Verificar se existe uma sessão válida.
    isLogged = req.session.isLogged;    
  
    if (!isLogged) {      
      res.redirect("/Login");
    }
    next();
}; 
  
/* GET métodos */
router.get('/ManutLivros', authenticationMiddleware, livrosApp.ManutLivros)
router.get('/InsertLivros', authenticationMiddleware, livrosApp.insertLivros);
router.get('/ViewLivros/:id', authenticationMiddleware, livrosApp.ViewLivros);
router.get('/UpdateLivros/:id', authenticationMiddleware, livrosApp.UpdateLivros);

/* POST métodos */
router.post('/InsertLivros', authenticationMiddleware, alunosApp.insertLivros);
router.post('/UpdateLivros', authenticationMiddleware, alunosApp.UpdateLivros);
router.post('/DeleteiIvros', authenticationMiddleware, alunosApp.DeleteiIvros);
// router.post('/ViewLivros', authenticationMiddleware, alunosApp.ViewLivros);


module.exports = router;
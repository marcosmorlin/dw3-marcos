var express = require('express');
var router = express.Router();
var autoresApp = require("../apps/Autores/controller/ctlAutores")



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
router.get('/ManutAutores', authenticationMiddleware, autoresApp.ManutAutores)
router.get('/InsertAutores', authenticationMiddleware, autoresApp.InsertAutores);
router.get('/ViewAutores/:id', authenticationMiddleware, autoresApp.ViewAutores);
router.get('/UpdateAutores/:id', authenticationMiddleware, autoresApp.UpdateAutores);

/* POST métodos */
router.post('/InsertAutores', authenticationMiddleware, autoresApp.InsertAutores);
router.post('/UpdateAutores', authenticationMiddleware, autoresApp.UpdateAutores);
router.post('/DeleteAutores', authenticationMiddleware, autoresApp.DeleteAutores);
// router.post('/viewAlunos', authenticationMiddleware, alunosApp.viewAlunos);


module.exports = router;
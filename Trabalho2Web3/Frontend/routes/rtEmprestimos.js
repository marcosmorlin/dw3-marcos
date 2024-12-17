var express = require('express');
var router = express.Router();
var emprestimosApp = require("../apps/Emprestimos/controller/ctlEmprestimos")



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
router.get('/ManutEmprestimos', authenticationMiddleware, alunosApp.manutEmprestimos)
router.get('/InsertEmprestimos', authenticationMiddleware, alunosApp.insertEmprestimos);
router.get('/ViewEmprestimos/:id', authenticationMiddleware, alunosApp.ViewEmprestimos);
router.get('/UpdateEmprestimos/:id', authenticationMiddleware, alunosApp.UpdateEmprestimos);

/* POST métodos */
router.post('/InsertEmprestimos', authenticationMiddleware, alunosApp.insertEmprestimos);
router.post('/UpdateEmprestimos', authenticationMiddleware, alunosApp.UpdateEmprestimos);
router.post('/DeleteEmprestimos', authenticationMiddleware, alunosApp.DeleteEmprestimos);
// router.post('/viewEmprestimos', authenticationMiddleware, emprestimosApp.viewEmprestimos);


module.exports = router;
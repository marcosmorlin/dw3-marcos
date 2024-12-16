const mdlAlunos = require("../model/mdlAlunos");

const getAllEmprestimos = (req, res) =>
    (async () => {
      let registro = await mdlEmprestimos.getAllEmprestimos();
      for (let i = 0; i < registro.length; i++) {
        const row = registro[i]; // Current row      
        const formattedDate = row.data_emprestimo.toISOString().split('T')[0];
        row.data_emprestimo = formattedDate;
        
      }
      res.json({ status: "ok", "registro": registro });
    })();
  
const getEmprestimoByID = (req, res) =>
    (async () => {
      const alunoID = parseInt(req.body.id);
      let registro = await mdlEmprestimos.getAlunoByID(ID);
  
  
      res.json({ status: "ok", "registro": registro });
    })();
  
const insertEmprestimos = (request, res) =>
    (async () => {
      //@ Atenção: aqui já começamos a utilizar a variável msg para retornar erros de banco de dados.
      const emprestimoREG = request.body;
      let { msg, linhasAfetadas } = await mdlEmprestimos.insertEmprestimos(emprestimoREG);
      res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
    })();
  
const updateEmprestimos = (request, res) =>
    (async () => {
      const emprestimoREG = request.body;
      let { msg, linhasAfetadas } = await mdlEmprestimos.insertEmprestimos(emprestimoREG);
      res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
    })();
  
const DeleteEmprestimos = (request, res) =>
    (async () => {
      const emprestimoREG = request.body;
      let { msg, linhasAfetadas } =  mdlEmprestimos.insertEmprestimos(emprestimoREG);
      res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
    })();
  
  module.exports = {
    getAllEmprestimos,
    getEmprestimoByID,
    insertEmprestimos,
    updateEmprestimos,
    DeleteEmprestimos,
  };
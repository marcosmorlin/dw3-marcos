const mdlAutores = require("../model/mdlAutores");

const GetAllAutores = (req, res) =>
    (async () => {
      let registro = await mdlAutores.GetAllAutores();
      res.json({ status: "ok", registro: registro });
    })();

const GetAutorByID = (req, res) =>
  (async () => {
    const ID = parseInt(req.body.id);
    let registro = await mdlAutores.GetAutorByID(ID);

    res.json({ status: "ok", registro: registro });
  })();
  
const InsertAutores = (request, res) =>
  (async () => {
    //@ Atenção: aqui já começamos a utilizar a variável msg para retornar erros de banco de dados.
    const registro = request.body;
    let { msg, linhasAfetadas } = await mdlAutores.InsertAutores(registro);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
  })();

const UpdateAutores = (request, res) =>
  (async () => {
    const registro = request.body;
    let { msg, linhasAfetadas } = await mdlAutores.UpdateAutores(registro);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
  })();

const DeleteAutores = (request, res) =>
  (async () => {
    const registro = request.body;
    let { msg, linhasAfetadas } = await mdlAutores.DeleteAutores(registro);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
  })();
  
module.exports = {
  GetAllAutores,
  GetAutorByID,
  InsertAutores,
  UpdateAutores,
  DeleteAutores
};
  
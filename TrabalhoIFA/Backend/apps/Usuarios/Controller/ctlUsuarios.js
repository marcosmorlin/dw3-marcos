const mdlUsuarios = require("../Model/mdlUsuarios");

const getALLUsuarios = (req, res) =>
    (async () => {
        let registro = await mdlUsuarios.getALLUsuarios();
        res.json({ status: "ok", "registro": registro });
    })();

const getUsuarioById = (req, res) =>
    (async () =>{
        const usuarioID = parseInt(req.body.usuarioID);
        let registro = await mdlUsuarios.getUsuarioById(usuarioID);

        res.json({ status: "ok", "registro": registro });
    })();

const InsertUsuarios = (request, res) =>
    (async () => {
        //@ Atenção: aqui já começamos a utilizar a variável msg para retornar erros de banco de dados.
        const usuarioREG = request.body;
        let { msg, linhasAfetadas } = await mdlUsuarios.InsertUsuarios(usuarioREG);
        res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
    })();

const UpdateUsuarios = (request, res) =>
    (async () => {
        const usuarioREG = request.body;
        let { msg, linhasAfetadas } = await mdlUsuarios.UpdateUsuarios(usuarioREG);
        res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
    })();  

const DeleteUsuarios = (request, res) =>
  (async () => {
    const usuarioREG = request.body;
    let { msg, linhasAfetadas } = await mdlUsuarios.DeleteUsuarios(usuarioREG);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

module.exports = {

    getALLUsuarios,
    getUsuarioById,
    InsertUsuarios,
    UpdateUsuarios,
    DeleteUsuarios

};
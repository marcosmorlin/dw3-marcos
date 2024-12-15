const mdlLivros = require("../Model/mdlLivros");

const getALLLivros = (req, res) =>
    (async () => {
        let registro = await mdlLivros.getALLLivros();
        for(i = 0; i < registro.length; i++){
            const row = registro[i];
            const formattedDate = row.data_publicacao.toISOString().split('T')[0];
            row.data_publicacao = formattedDate;
        }
        res.json({ status: "ok", "registro": registro });
    })();

const getLivrosById = (req, res) =>
    (async () =>{
        const livroID = parseInt(req.body.livroID);
        let registro = await mdlLivros.getLivrosById(livroID);

        res.json({ status: "ok", "registro": registro });
    })();

const insertLivros= (request, res) =>
    (async () => {
        //@ Atenção: aqui já começamos a utilizar a variável msg para retornar erros de banco de dados.
        const livroREG = request.body;
        let { msg, linhasAfetadas } = await mdlLivros.insertLivros(livroREG);
        res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
    })();

const UpdateLivros = (request, res) =>
    (async () => {
        const livroREG = request.body;
        let { msg, linhasAfetadas } = await mdlLivros.UpdateLivros(livroREG);
        res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
    })();  

const DeleteLivros = (request, res) =>
  (async () => {
    const livroREG = request.body;
    let { msg, linhasAfetadas } = await mdlLivros.DeleteLivros(livroREG);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

module.exports = {

    getALLLivros,
    getLivrosById,
    insertLivros,
    UpdateLivros,
    DeleteLivros

};
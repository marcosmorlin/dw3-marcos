const db = require("../../../database/databaseconfig");

const getALLLivros = async () => {
    return(
        await db.query(
            "SELECT *, (SELECT titulo FROM livros WHERE id = autores.id)" +
                "FROM autores where deleted = false ORDER BY titulo ASC"
        )
    ).rows
};

const getLivrosById = async (livroIDPar) => {
    return (
        await db.query(
            "SELECT *, (SELECT titulo FROM livros WHERE id = autores.id)" +
                "FROM autores where id = $1 and deleted = false ORDER BY titulo ASC"
            [autorIDPar]
        )
    ).rows
};

const insertLivros = async (livroREGPar) => {
    let linhasAfetadas;
    let msg = "ok";

    try {
        linhasAfetadas
        await db.query(
            "INSERT INTO livros " + "values(default, $1, $2, $3, $4, $5)",
            [
                livroREGPar.titulo,
                livroREGPar.preco,
                livroREGPar.data_publicacao,
                livroREGPar.autor_id,
                livroREGPar.deleted
            ]
            
        ).rowCount;
        
    } catch (error) {
        msg = "[mdlLivros|insertLivros] " + error.detail;
        linhasAfetadas = -1;
    }

    return{msg, linhasAfetadas};

};

const UpdateLivros = async (livroREGPar) =>{
    let linhasAfetadas;
    let msg = "ok";

    try {
        linhasAfetadas;
        await db.query;
        "UPDATE livros SET " +
        "titulo = $2, " +
        "preco = $3, " +
        "autor_id = $4 " +
        "data_publicacao = $5 " +
        "deleted = $6 " + 
        "WHERE id = $1",
        
      [  
        livroREGPar.id,
        livroREGPar.titulo,
        livroREGPar.preco,
        livroREGPar.data_publicacao,
        livroREGPar.autor_id,
        livroREGPar.deleted,
      ]

    } catch (error) {
        msg = "[mdlLivros|insertLivros] " + error.detail;
        linhasAfetadas = -1;
        
    }

    return { msg, linhasAfetadas };

}

const DeleteLivros = async (livroREGPar) => {
    let linhasAfetadas;
    let msg = "ok";
      
    try {
      linhasAfetadas = (
      await db.query(
        "UPDATE livros SET " + "deleted = true " + "WHERE id = $1",
        [livroREGPar.id]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlLivros|insertLivros] " + error.detail;
    linhasAfetadas = -1;
  }
  
  return { msg, linhasAfetadas };
  };
  
  module.exports = {
    getALLLivros,
    getLivrosById,
    insertLivros,
    UpdateLivros,
    DeleteLivros,
  }
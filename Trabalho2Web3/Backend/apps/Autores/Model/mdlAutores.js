const db = require("../../../database/databaseconfig");

const GetAllAutores = async () => {
    return (
      await db.query(
        "SELECT * " + "FROM autores where deleted = false ORDER BY nome ASC"
      )
    ).rows;
};

const GetAutorByID = async (AutorIDPar) => {
    return (
      await db.query(
        "SELECT * " +
          "FROM autores WHERE id = $1 and deleted = false ORDER BY nome ASC",
        [cursoIDPar]
      )
    ).rows;
};

const InsertAutores = async (registroPar) => {
    //@ Atenção: aqui já começamos a utilizar a variável msg para retornor erros de banco de dados.
    let linhasAfetadas;
    let msg = "ok";
    try {
      linhasAfetadas = (
        await db.query(
          "INSERT INTO autores " + "values(default, $1, $2, $3)",
          [
            registroPar.nome,
            registroPar.data_criacao,
            registroPar.deleted,
          ]
        )
      ).rowCount;
    } catch (error) {
      msg = "[mdlAutores|InsertAutores] " + error.detail;
      linhasAfetadas = -1;
    }
  
    return { msg, linhasAfetadas };
};  

const UpdateAutores = async (registroPar) => {
    let linhasAfetadas;
    let msg = "ok";
    try {
      linhasAfetadas = (
        await db.query(
          "UPDATE autores SET " +
            "nome = $2, " +
            "data_criacao = $3, " +
            "deleted = $4 " +          
            "WHERE id = $1",
          [
              registroPar.id  ,
              registroPar.nome   ,
              registroPar.data_criacao,
              registroPar.deleted,          
          ]
        )
      ).rowCount;
    } catch (error) {
      msg = "[mdlAutores|UpdateAutores] " + error.detail;
      linhasAfetadas = -1;
    }
  
    return { msg, linhasAfetadas };
};

const DeleteAutores = async (registroPar) => {
    let linhasAfetadas;
    let msg = "ok";
      
    try {
      linhasAfetadas = (
      await db.query(
        "UPDATE autores SET " + "deleted = true " + "WHERE id = $1",
        [registroPar.id]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlAutores|DeleteAutores] " + error.detail;
    linhasAfetadas = -1;
  }
  
  return { msg, linhasAfetadas };
};

module.exports = {
    GetAllAutores,
    GetAutorByID,
    InsertAutores,
    UpdateAutores,
    DeleteAutores,
  };
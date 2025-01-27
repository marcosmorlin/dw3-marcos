const db = require("../../../database/databaseconfig");

const GetAllUsuarios = async () => {
    return (
      await db.query(
        "SELECT * " + "FROM usuarios where deleted = false ORDER BY nome "
      )
    ).rows;
};


const getUsuarioByID = async (usuarioIDPar) => {
    return (
      await db.query(
        "SELECT * from USUARIOS WHERE id = $1 and deleted = false ORDER BY nome",
        [usuarioIDPar]
      )
    ).rows;
};


const insertUsuarios = async (usuarioREGPar) => {
    //@ Atenção: aqui já começamos a utilizar a variável msg para retornor erros de banco de dados.
    let linhasAfetadas;
    let msg = "ok";
    try {
      linhasAfetadas = (
        await db.query(
          "INSERT INTO usuarios " + "values(default, $1, $2, $3)",
          [
            usuarioREGPar.id,
            usuarioREGPar.codigo,
            usuarioREGPar.descricao,
            usuarioREGPar.deleted,
          ]
        )
      ).rowCount;
    } catch (error) {
      msg = "[mdlUsuarios|insertUsuarios] " + error.detail;
      linhasAfetadas = -1;
    }
  
    return { msg, linhasAfetadas };
  };

const UpdateUsuarios = async (usuarioREGPar) => {
    let linhasAfetadas;
    let msg = "ok";
    try {
      linhasAfetadas = (
        await db.query(
          "UPDATE usuarios SET " +
            "codigo = $2, " +
            "descricao = $3 " +
            "deleted = $4 " +
            "WHERE id = $1",
          [
            usuarioREGPar.id,
            usuarioREGPar.codigo,
            usuarioREGPar.descricao,
          ]
        )
      ).rowCount;
    } catch (error) {
      msg = "[mdlUsuarios|insertUsuarios] " + error.detail;
      linhasAfetadas = -1;
    }
  
    return { msg, linhasAfetadas };
  };  

const DeleteUsuarios = async (usuarioREGPar) => {
    let linhasAfetadas;
    let msg = "ok";
      
    try {
      linhasAfetadas = (
      await db.query(
        "UPDATE usuarios SET " + "deleted = true " + "WHERE id = $1",
        [usuarioREGPar.id]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlUsuarios|insertUsuarios] " + error.detail;
    linhasAfetadas = -1;
  }
  
  return { msg, linhasAfetadas };
  };
  
  module.exports = {
    GetAllUsuarios,
    getUsuarioByID,
    insertUsuarios,
    UpdateUsuarios,
    DeleteUsuarios,
  };  
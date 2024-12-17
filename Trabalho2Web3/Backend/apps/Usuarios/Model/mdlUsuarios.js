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
          "INSERT INTO usuarios " + "values(default, $1, $2, $3, $4, $5)",
          [
            usuarioREGPar.nome,
            usuarioREGPar.data_cadastro,
            usuarioREGPar.saldo,
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

const UpdateAlunos = async (alunoREGPar) => {
    let linhasAfetadas;
    let msg = "ok";
    try {
      linhasAfetadas = (
        await db.query(
          "UPDATE usuarios SET " +
            "nome = $2, " +
            "data_cadastro = $3 " +
            "saldo = $4 " +
            "deleted = $8 " +
            "WHERE id = $1",
          [
            usuarioREGPar.id,
            usuarioREGPar.nome,
            usuarioREGPar.data_cadastro,
            usuarioREGPar.saldo,
            usuarioREGPar.datanascimento,
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
    UpdateAlunos,
    DeleteUsuarios,
  };  
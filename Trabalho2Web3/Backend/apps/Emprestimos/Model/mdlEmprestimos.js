const db = require("../../../database/databaseconfig");

const GetAllEmprestimos = async () => {
    return (
      await db.query(
        "SELECT * " + "FROM emprestimos where deleted = false ORDER BY usuario_id"
      )
    ).rows;
};

const GetEmprestimoByID = async (EmprestimoIDPar) => {
    return (
      await db.query(
        "SELECT * " +
          "FROM emprestimos WHERE id = $1 and deleted = false ORDER BY usuario_id",
        [cursoIDPar]
      )
    ).rows;
};

const InsertEmprestimos = async (registroPar) => {
    //@ Atenção: aqui já começamos a utilizar a variável msg para retornor erros de banco de dados.
    let linhasAfetadas;
    let msg = "ok";
    try {
      linhasAfetadas = (
        await db.query(
          "INSERT INTO emprestimos " + "values(default, $1, $2, $3, $4, $5)",
          [
            registroPar.livro_id,
            registroPar.data_emprestimo,
            registroPar.data_devolucao,
            registroPar.taxa_multa,
            registroPar.deleted,
          ]
        )
      ).rowCount;
    } catch (error) {
      msg = "[mdlEmprestimos|InsertEmprestimos] " + error.detail;
      linhasAfetadas = -1;
    }
  
    return { msg, linhasAfetadas };
};  

const UpdateEmprestimos = async (EmprestimoREGPar) => {
    let linhasAfetadas;
    let msg = "ok";
    try {
      linhasAfetadas = (
        await db.query(
          "UPDATE autores SET " +
            "livro_id = $2, " +
            "data_emprestimo = $3, " +
            "data_devolucao = $4 " +
            "taxa_multa = $5 " +
            "deleted = $6 " +          
            "WHERE livro_id = $1",
          [
              registroPar.usuario_id ,
              registroPar.livro_id,
              registroPar.data_emprestimo,
              registroPar.data_devolucao,
              registroPar.taxa_multa,
              registroPar.deleted,          
          ]
        )
      ).rowCount;
    } catch (error) {
      msg = "[mdlEmprestimos|UpdateEmprestimos] " + error.detail;
      linhasAfetadas = -1;
    }
  
    return { msg, linhasAfetadas };
};

const DeleteEmprestimos = async (registroPar) => {
    let linhasAfetadas;
    let msg = "ok";
      
    try {
      linhasAfetadas = (
      await db.query(
        "UPDATE emprestimos SET " + "deleted = true " + "WHERE livro_id = $1",
        [registroPar.id]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlEmprestimos|UpdateEmprestimos] " + error.detail;
    linhasAfetadas = -1;
  }
  
  return { msg, linhasAfetadas };
};

module.exports = {
    GetAllEmprestimos,
    GetEmprestimoByID,
    InsertEmprestimos,
    UpdateEmprestimos,
    DeleteEmprestimos,
  };
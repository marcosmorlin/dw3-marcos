const db = require("../../../../database/databaseconfig");

// Retorna todos os bancos não removidos
const getAllBancos = async () => {
    return (
        await db.query(
            "SELECT * FROM bancos WHERE saldo = saldo.id"
        )
    ).rows;
};

// Retorna um banco pelo ID, caso não tenha sido removido
const getBancoById = async (bancoId) => {
    return (
        await db.query(
            "SELECT * FROM bancos WHERE id = $1 AND removido = false",
            [bancoId]
        )
    ).rows[0];
};

// Insere um novo banco
const insertBanco = async (bancoData) => {
    let linhasAfetadas;
    let msg = "ok";

    try {
        linhasAfetadas = (
            await db.query(
                "INSERT INTO bancos(nome, saldo, removido, criadoem) VALUES ($1, $2, $3, $4)",
                [
                    bancoData.nome,
                    bancoData.saldo, 
                    false, 
                    bancoData.criadoem
                ]
            )
        ).rowCount;
    } catch (error) {
        msg = "[bancoModel|insertBanco] " + error.detail;
        linhasAfetadas = -1;
    }

    return { msg, linhasAfetadas };
};

// Atualiza um banco pelo ID
const updateBanco = async (bancoData) => {
    let linhasAfetadas;
    let msg = "ok";

    try {
        linhasAfetadas = (
            await db.query(
                "UPDATE bancos SET nome = $2, saldo = $3 WHERE id = $1",
                [bancoData.id, bancoData.nome, bancoData.saldo]
            )
        ).rowCount;
    } catch (error) {
        msg = "[bancoModel|updateBanco] " + error.detail;
        linhasAfetadas = -1;
    }

    return { msg, linhasAfetadas };
};

// Marca um banco como removido (soft delete)
const deleteBanco = async (bancoId) => {
    let linhasAfetadas;
    let msg = "ok";

    try {
        linhasAfetadas = (
            await db.query(
                "UPDATE bancos SET removido = true WHERE id = $1",
                [bancoId]
            )
        ).rowCount;
    } catch (error) {
        msg = "[bancoModel|deleteBanco] " + error.detail;
        linhasAfetadas = -1;
    }

    return { msg, linhasAfetadas };
};

module.exports = {
    getAllBancos,
    getBancoById,
    insertBanco,
    updateBanco,
    deleteBanco,
};

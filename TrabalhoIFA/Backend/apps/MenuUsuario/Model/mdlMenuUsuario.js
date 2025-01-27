const mdlMenuUsuario = require("../Model/mdlMenuUsuario");

const getAllMenuUsuarios = async () => {
    try {
        const query = `
            SELECT mu.usuarioid, mu.menuid, u.codigo AS usuario_codigo, m.codigo AS menu_codigo
            FROM menuUsuario mu
            INNER JOIN usuarios u ON u.usuarioid = mu.usuarioid
            INNER JOIN menu m ON m.menuid = mu.menuid
            WHERE mu.deleted = false;
        `;
        const { rows } = await db.query(query);
        return rows;
    } catch (error) {
        console.error("Erro ao obter menuUsuario:", error);
        throw error;
    }
};

const getMenuUsuarioById = async (usuarioid, menuid) => {
    try {
        const query = `
            SELECT mu.usuarioid, mu.menuid, u.codigo AS usuario_codigo, m.codigo AS menu_codigo
            FROM menuUsuario mu
            INNER JOIN usuarios u ON u.usuarioid = mu.usuarioid
            INNER JOIN menu m ON m.menuid = mu.menuid
            WHERE mu.usuarioid = $1 AND mu.menuid = $2 AND mu.deleted = false;
        `;
        const values = [usuarioid, menuid];
        const { rows } = await db.query(query);
        return rows[0];
    } catch (error) {
        console.error("Erro ao obter menuUsuario por IDs:", error);
        throw error;
    }
};

const insertMenuUsuario = async (usuarioid, menuid) => {
    try {
        const query = `
            INSERT INTO menuUsuario (usuarioid, menuid)
            VALUES ($1, $2)
            RETURNING *;
        `;
        const values = [usuarioid, menuid];
        const { rows } = await db.query(query, values);
        return { msg: "Relacionamento inserido com sucesso.", item: rows[0] };
    } catch (error) {
        console.error("Erro ao inserir menuUsuario:", error);
        throw error;
    }
};

const deleteMenuUsuario = async (usuarioid, menuid) => {
    try {
        const query = `
            UPDATE menuUsuario
            SET deleted = true
            WHERE usuarioid = $1 AND menuid = $2
            RETURNING *;
        `;
        const values = [usuarioid, menuid];
        const { rows } = await db.query(query, values);
        if (rows.length === 0) {
            return { msg: "Relacionamento não encontrado ou já excluído.", item: null };
        }
        return { msg: "Relacionamento excluído com sucesso.", item: rows[0] };
    } catch (error) {
        console.error("Erro ao excluir menuUsuario:", error);
        throw error;
    }
};

module.exports = {
    getAllMenuUsuarios,
    getMenuUsuarioById,
    insertMenuUsuario,
    deleteMenuUsuario,
};


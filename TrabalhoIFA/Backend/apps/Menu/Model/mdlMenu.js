const mdlMenu = require("../Model/mdlMenu");

const getALLMenu = async () => {
    try {
        const query = 'SELECT * FROM menu WHERE deleted = false';
        const { rows } = await db.query(query);
        return rows;
    } catch (error) {
        console.error("Erro ao obter itens do menu:", error);
        throw error;
    }
};

const getMenuById = async (menuid) => {
    try {
        const query = 'SELECT * FROM menu WHERE menuid = $1 AND deleted = false';
        const values = [menuid];
        const { rows } = await db.query(query);
        return rows[0];
    } catch (error) {
        console.error("Erro ao obter item do menu:", error);
        throw error;
    }
};

const insertMenu = async (menuData) => {
    try {
        const query = `
            INSERT INTO menu (codigo, descricao, nivel)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        const values = [menuData.codigo, menuData.descricao, menuData.nivel];
        const { rows } = await db.query(query, values);
        return { msg: "Item inserido com sucesso.", item: rows[0] };
    } catch (error) {
        console.error("Erro ao inserir item no menu:", error);
        throw error;
    }
};

const updateMenu = async (menuid, menuData) => {
    try {
        const query = `
            UPDATE menu
            SET codigo = $1, descricao = $2, nivel = $3
            WHERE menuid = $4 AND deleted = false
            RETURNING *;
        `;
        const values = [menuData.codigo, menuData.descricao, menuData.nivel, menuid];
        const { rows } = await db.query(query, values);
        if (rows.length === 0) {
            return { msg: "Item não encontrado ou já excluído.", item: null };
        }
        return { msg: "Item atualizado com sucesso.", item: rows[0] };
    } catch (error) {
        console.error("Erro ao atualizar item do menu:", error);
        throw error;
    }
};

const deleteMenu = async (menuid) => {
    try {
        const query = `
            UPDATE menu
            SET deleted = true
            WHERE menuid = $1
            RETURNING *;
        `;
        const values = [menuid];
        const { rows } = await db.query(query, values);
        if (rows.length === 0) {
            return { msg: "Item não encontrado ou já excluído.", item: null };
        }
        return { msg: "Item excluído com sucesso.", item: rows[0] };
    } catch (error) {
        console.error("Erro ao excluir item do menu:", error);
        throw error;
    }
};

module.exports = {
    getALLMenu,
    getMenuById,
    insertMenu,
    updateMenu,
    deleteMenu,
};

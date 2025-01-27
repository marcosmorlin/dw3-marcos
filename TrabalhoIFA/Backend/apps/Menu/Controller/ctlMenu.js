const mdlMenu = require("../Model/mdlMenu");

const getAllMenu = async (req, res) => {
    try {
        const registro = await mdlMenu.getALLMenu();
        res.json({ status: "ok", registro });
    } catch (error) {
        console.error("Erro ao obter itens do menu:", error);
        res.status(500).json({ status: "error", message: "Erro ao obter itens do menu." });
    }
};

const getMenuById = async (req, res) => {
    try {
        const menuid = parseInt(req.params.id);
        if (isNaN(menuid)) {
            return res.status(400).json({ status: "error", message: "ID inválido." });
        }

        const registro = await mdlMenu.getMenuById(menuid);
        if (!registro) {
            return res.status(404).json({ status: "error", message: "Item não encontrado." });
        }

        res.json({ status: "ok", registro });
    } catch (error) {
        console.error("Erro ao obter item do menu:", error);
        res.status(500).json({ status: "error", message: "Erro ao obter item do menu." });
    }
};

const insertMenu = async (req, res) => {
    try {
        const menuData = req.body;

        if (!menuData.codigo || !menuData.descricao || !menuData.nivel) {
            return res.status(400).json({ status: "error", message: "Dados incompletos." });
        }

        const result = await mdlMenu.insertMenu(menuData);
        res.status(201).json({ status: "ok", message: result.msg, item: result.item });
    } catch (error) {
        console.error("Erro ao inserir item no menu:", error);
        res.status(500).json({ status: "error", message: "Erro ao inserir item no menu." });
    }
};

const updateMenu = async (req, res) => {
    try {
        const menuid = parseInt(req.params.id);
        const menuData = req.body;

        if (isNaN(menuid)) {
            return res.status(400).json({ status: "error", message: "ID inválido." });
        }

        if (!menuData.codigo || !menuData.descricao || !menuData.nivel) {
            return res.status(400).json({ status: "error", message: "Dados incompletos." });
        }

        const result = await mdlMenu.updateMenu(menuid, menuData);
        if (!result.item) {
            return res.status(404).json({ status: "error", message: result.msg });
        }

        res.json({ status: "ok", message: result.msg, item: result.item });
    } catch (error) {
        console.error("Erro ao atualizar item do menu:", error);
        res.status(500).json({ status: "error", message: "Erro ao atualizar item do menu." });
    }
};

// Excluir um item do menu
const deleteMenu = async (req, res) => {
    try {
        const menuid = parseInt(req.params.id);

        if (isNaN(menuid)) {
            return res.status(400).json({ status: "error", message: "ID inválido." });
        }

        const result = await mdlMenu.deleteMenu(menuid);
        if (!result.item) {
            return res.status(404).json({ status: "error", message: result.msg });
        }

        res.json({ status: "ok", message: result.msg, item: result.item });
    } catch (error) {
        console.error("Erro ao excluir item do menu:", error);
        res.status(500).json({ status: "error", message: "Erro ao excluir item do menu." });
    }
};

module.exports = {
    getAllMenu,
    getMenuById,
    insertMenu,
    updateMenu,
    deleteMenu,
};

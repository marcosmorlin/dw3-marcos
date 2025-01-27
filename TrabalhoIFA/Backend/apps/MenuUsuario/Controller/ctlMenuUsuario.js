const mdlMenuUsuario = require("../Model/mdlMenuUsuario");

const getAllMenuUsuarios = async (req, res) => {
    try {
        const registro = await mdlMenuUsuario.getAllMenuUsuarios();
        res.json({ status: "ok", registro });
    } catch (error) {
        console.error("Erro ao obter menuUsuario:", error);
        res.status(500).json({ status: "error", message: "Erro ao obter relacionamentos." });
    }
};

// Obter um relacionamento específico por IDs
const getMenuUsuarioById = async (req, res) => {
    try {
        const usuarioid = parseInt(req.params.usuarioid);
        const menuid = parseInt(req.params.menuid);

        if (isNaN(usuarioid) || isNaN(menuid)) {
            return res.status(400).json({ status: "error", message: "IDs inválidos." });
        }

        const registro = await mdlMenuUsuario.getMenuUsuarioByIds(usuarioid, menuid);
        if (!registro) {
            return res.status(404).json({ status: "error", message: "Relacionamento não encontrado." });
        }

        res.json({ status: "ok", registro });
    } catch (error) {
        console.error("Erro ao obter relacionamento por IDs:", error);
        res.status(500).json({ status: "error", message: "Erro ao obter relacionamento." });
    }
};

// Inserir um novo relacionamento
const insertMenuUsuario = async (req, res) => {
    try {
        const { usuarioid, menuid } = req.body;

        if (!usuarioid || !menuid) {
            return res.status(400).json({ status: "error", message: "Dados incompletos." });
        }

        const result = await mdlMenuUsuario.insertMenuUsuario(usuarioid, menuid);
        res.status(201).json({ status: "ok", message: result.msg, item: result.item });
    } catch (error) {
        console.error("Erro ao inserir menuUsuario:", error);
        res.status(500).json({ status: "error", message: "Erro ao inserir relacionamento." });
    }
};

// Excluir um relacionamento
const deleteMenuUsuario = async (req, res) => {
    try {
        const usuarioid = parseInt(req.params.usuarioid);
        const menuid = parseInt(req.params.menuid);

        if (isNaN(usuarioid) || isNaN(menuid)) {
            return res.status(400).json({ status: "error", message: "IDs inválidos." });
        }

        const result = await mdlMenuUsuario.deleteMenuUsuario(usuarioid, menuid);
        if (!result.item) {
            return res.status(404).json({ status: "error", message: result.msg });
        }

        res.json({ status: "ok", message: result.msg, item: result.item });
    } catch (error) {
        console.error("Erro ao excluir menuUsuario:", error);
        res.status(500).json({ status: "error", message: "Erro ao excluir relacionamento." });
    }
};

module.exports = {
    getAllMenuUsuarios,
    getMenuUsuarioById,
    insertMenuUsuario,
    deleteMenuUsuario,
};

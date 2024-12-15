const Banco = require('../model/mdlBanco');

const getAllBancos = async (req, res) => {
    try {
        const bancos = await Banco.findAll({ where: { removido: false } });
        res.json(bancos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar bancos' });
    }
};

const getBancoById = async (req, res) => {
    try {
        const { id } = req.params;
        const banco = await Banco.findOne({ where: { id, removido: false } });
        if (!banco) return res.status(404).json({ error: 'Banco não encontrado' });
        res.json(banco);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar banco' });
    }
};

const insertBanco = async (req, res) => {
    try {
        const { nome, saldo } = req.body;
        const novoBanco = await Banco.create({ nome, saldo });
        res.status(201).json(novoBanco);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao inserir banco' });
    }
};

const updateBanco = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, saldo } = req.body;
        const banco = await Banco.findByPk(id);
        if (!banco || banco.removido) return res.status(404).json({ error: 'Banco não encontrado' });

        await banco.update({ nome, saldo });
        res.json(banco);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar banco' });
    }
};

const deleteBanco = async (req, res) => {
    try {
        const { id } = req.params;
        const banco = await Banco.findByPk(id);
        if (!banco || banco.removido) return res.status(404).json({ error: 'Banco não encontrado' });

        await banco.update({ removido: true });
        res.json({ message: 'Banco removido com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao remover banco' });
    }
};

module.exports = { getAllBancos, getBancoById, insertBanco, updateBanco, deleteBanco };

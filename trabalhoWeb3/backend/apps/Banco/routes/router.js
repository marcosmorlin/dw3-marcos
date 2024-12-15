const express = require('express');
const router = express.Router();
const { getAllBancos, getBancoById, insertBanco, updateBanco, deleteBanco } = require('../controller/ctlBanco.js');

// Rotas sem duplicar prefixo
router.get('/', getAllBancos); // /api/bancos/
router.get('/:id', getBancoById); // /api/bancos/:id
router.post('/', insertBanco); // /api/bancos/
router.put('/:id', updateBanco); // /api/bancos/:id
router.delete('/:id', deleteBanco); // /api/bancos/:id

module.exports = router;

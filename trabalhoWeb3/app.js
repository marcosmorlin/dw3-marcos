const express = require('express');
const bancoRoutes = require('./backend/apps/Banco/Routes/router'); // Rotas relacionadas a bancos
// const authRoutes = require('./backend/apps/Auth/Routes/router'); // Rotas relacionadas a autenticação (remova se ainda não implementou)

const app = express();

// Middleware para interpretar JSON
app.use(express.json());

// Registro das rotas
app.use('/api/bancos', bancoRoutes);
// app.use('/api/auth', authRoutes); // Descomente quando implementar autenticação

// Inicialização do servidor
app.listen(5000, () => {
    console.log('Servidor rodando na porta 5000');
});

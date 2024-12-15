// server.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const route = require('./route/route');

app.use(bodyParser.json());
app.use('/', route);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

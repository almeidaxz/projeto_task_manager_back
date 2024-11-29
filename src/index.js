const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes/routes');
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(routes)

// Rota base, apenas para demonstrar que o app está rodando
app.get('/', (req, res) => {
    res.send('Servidor Rodando!');
});

// Escutar na porta configurada no env
const port = process.env.SERVER_PORT;
app.listen(port, '0.0.0.0', () => {
    console.log(`App running and listening on port ${port}`);
});
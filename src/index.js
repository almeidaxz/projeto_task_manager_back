const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes/routes');
require('dotenv').config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
app.use(express.json());
app.use(cors());
app.use(routes)

// Rota base, apenas para demonstrar que o app está rodando
app.get('/', (req, res) => {
    res.send('Hello World!');
});

const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
    console.log(`App running and listening on port ${port}`);
});
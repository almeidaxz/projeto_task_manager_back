const express = require('express');
const app = express();
const routes = require('./routes/routes');
app.use(express.json());

// Rota base, apenas para demonstrar que o app está rodando
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(routes)

app.listen(3000, () => {
    console.log("App running and listening on port 3000");
});
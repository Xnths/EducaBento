const Login = require('../models/Login');

module.exports = app => {
    app.get('/login', (req, res, erro) => {
        Login.encontra(res, erro);
    })

    app.post('/login', (req, res, erro) => {
        const login = req.body;
        Login.adiciona(login, res, erro);
    })

    app.patch('/login/:id', (req, res, erro) => {
        const id = parseInt(req.params.id);
        const valores = req.body;
        Login.altera(id, valores, res, erro);
    })

    app.delete('/login/:id', (req, res, erro) => {
        const id = req.params.id;
        Login.deleta(id, res, erro);
    })
}
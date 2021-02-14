module.exports = app => {
    app.get('/login', (req, res) => {
        console.log("Conectado");
    })

    app.post('/login', (req, res) => {
        console.log(req.body);
    })
}
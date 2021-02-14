const conexao = require('./arquitetura/conexao')
const customExpress = require('./config/customExpress');

const app = customExpress();

conexao
    .then(
        app.listen(process.env.port || 3000, () => {
            console.log("Escutando o servidor");
        })
    )
    .catch(erro => console.log(erro));
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
    email: {
        type: String,
        required: [true, "Necessita-se do email"]
    },
    senha: {
        type: String,
        required: [true, "Necessita-se da Senha"]
    }
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);

module.exports = Usuario;
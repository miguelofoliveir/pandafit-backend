const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  _id: String,
  senha: String
});

module.exports = mongoose.model('Usuario', UsuarioSchema);

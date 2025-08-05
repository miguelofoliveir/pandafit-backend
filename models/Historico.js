const mongoose = require('mongoose');

const HistoricoSchema = new mongoose.Schema({
  data: String,
  tipo: String,
  referencia: String
});

module.exports = mongoose.model('Historico', HistoricoSchema);

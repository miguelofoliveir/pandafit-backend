const mongoose = require('mongoose');

const TreinoSchema = new mongoose.Schema({
  _id: String,
  grupoMuscular: String,
  exercicios: [String]
});

module.exports = mongoose.model('Treino', TreinoSchema);

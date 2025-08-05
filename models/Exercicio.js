const mongoose = require('mongoose');

const ExercicioSchema = new mongoose.Schema({
  nome: String,
  series: String,
  tecnica: String,
  urlVideo: String,
  grupoMuscular: String
});

module.exports = mongoose.model('Exercicio', ExercicioSchema);

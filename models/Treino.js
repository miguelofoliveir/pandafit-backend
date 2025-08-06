const mongoose = require('mongoose');

const TreinoSchema = new mongoose.Schema({
  _id: String,
  nome: {
    type: String,
    required: true
  },
  grupoMuscular: String, // Manter para compatibilidade
  gruposMusculares: [String], // Novo - Array de grupos musculares
  exercicios: [String],
  criadoEm: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Treino', TreinoSchema);

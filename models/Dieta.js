const mongoose = require('mongoose');

const DietaSchema = new mongoose.Schema({
  horario: String,
  alimentos: [
    {
      nome: String,
      quantidade: String,
      calorias: Number
    }
  ]
});

module.exports = mongoose.model('Dieta', DietaSchema);

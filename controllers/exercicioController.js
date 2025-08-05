const Exercicio = require('../models/Exercicio');

exports.getAll = async (req, res) => {
  try {
    const exercicios = await Exercicio.find();
    res.json(exercicios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const novo = new Exercicio(req.body);
    await novo.save();
    res.status(201).json(novo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

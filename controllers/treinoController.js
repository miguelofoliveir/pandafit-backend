const Treino = require('../models/Treino');

exports.getAll = async (req, res) => {
  try {
    const treinos = await Treino.find();
    res.json(treinos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const novo = new Treino(req.body);
    await novo.save();
    res.status(201).json(novo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
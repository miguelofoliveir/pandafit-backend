const Dieta = require('../models/Dieta');

exports.getAll = async (req, res) => {
  try {
    const dietas = await Dieta.find();
    res.json(dietas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const novo = new Dieta(req.body);
    await novo.save();
    res.status(201).json(novo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
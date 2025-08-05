const Historico = require('../models/Historico');

exports.getAll = async (req, res) => {
  try {
    const historicos = await Historico.find();
    res.json(historicos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const novo = new Historico(req.body);
    await novo.save();
    res.status(201).json(novo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
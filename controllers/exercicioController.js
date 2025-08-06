const Exercicio = require('../models/Exercicio');

exports.getAll = async (req, res) => {
  try {
    const exercicios = await Exercicio.find();
    res.json(exercicios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const exercicio = await Exercicio.findById(req.params.id);
    if (!exercicio) {
      return res.status(404).json({ error: 'Exercício não encontrado' });
    }
    res.json(exercicio);
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

exports.update = async (req, res) => {
  try {
    const exercicio = await Exercicio.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!exercicio) {
      return res.status(404).json({ error: 'Exercício não encontrado' });
    }
    
    res.json(exercicio);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const exercicio = await Exercicio.findByIdAndDelete(req.params.id);
    
    if (!exercicio) {
      return res.status(404).json({ error: 'Exercício não encontrado' });
    }
    
    res.json({ message: 'Exercício deletado com sucesso', exercicio });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

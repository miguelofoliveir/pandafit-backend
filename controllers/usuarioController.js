const Usuario = require('../models/Usuario');

exports.getAll = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const novo = new Usuario(req.body);
    await novo.save();
    res.status(201).json(novo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { _id, senha } = req.body;
    
    // Busca o usuário no banco
    const usuario = await Usuario.findById(_id);
    
    if (!usuario) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }
    
    // Verifica a senha
    if (usuario.senha !== senha) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }
    
    // Login bem-sucedido
    res.json({ 
      message: 'Login realizado com sucesso',
      usuario: {
        id: usuario._id
      }
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
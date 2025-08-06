const Treino = require('../models/Treino');

// Lista completa dos grupos musculares válidos
const GRUPOS_MUSCULARES_VALIDOS = [
  'Dorsais',
  'Posterior de Ombros',
  'Trapézio',
  'Lombar',
  'Peitorais',
  'Deltoide Anterior',
  'Deltoide Lateral',
  'Quadríceps',
  'Posteriores de Coxa',
  'Glúteos',
  'Panturrilhas',
  'Bíceps',
  'Antebraços',
  'Tríceps',
  'Abdominais',
  'Oblíquos'
];

// Função para validar grupos musculares
const validarGruposMusculares = (grupos) => {
  if (!Array.isArray(grupos)) return false;
  
  // Verificar se todos os grupos são válidos
  const gruposInvalidos = grupos.filter(grupo => !GRUPOS_MUSCULARES_VALIDOS.includes(grupo));
  if (gruposInvalidos.length > 0) {
    throw new Error(`Grupos musculares inválidos: ${gruposInvalidos.join(', ')}`);
  }
  
  // Verificar duplicatas
  const gruposUnicos = [...new Set(grupos)];
  if (gruposUnicos.length !== grupos.length) {
    throw new Error('Não é permitido grupos musculares duplicados');
  }
  
  return true;
};

exports.getAll = async (req, res) => {
  try {
    const treinos = await Treino.find();
    res.json(treinos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const treino = await Treino.findById(req.params.id);
    if (!treino) {
      return res.status(404).json({ error: 'Treino não encontrado' });
    }
    res.json(treino);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { nome, grupoMuscular, gruposMusculares, exercicios } = req.body;
    
    // Validação: nome é obrigatório
    if (!nome || nome.trim() === '') {
      return res.status(400).json({ error: 'Nome do treino é obrigatório' });
    }
    
    // Validação: pelo menos um grupo muscular é obrigatório
    if (!grupoMuscular && (!gruposMusculares || gruposMusculares.length === 0)) {
      return res.status(400).json({ 
        error: 'Pelo menos um grupo muscular é obrigatório (grupoMuscular ou gruposMusculares)' 
      });
    }
    
    // Validar grupos musculares se fornecidos
    if (gruposMusculares && gruposMusculares.length > 0) {
      validarGruposMusculares(gruposMusculares);
    }
    
    // Validar grupo muscular único se fornecido
    if (grupoMuscular && !GRUPOS_MUSCULARES_VALIDOS.includes(grupoMuscular)) {
      return res.status(400).json({ 
        error: `Grupo muscular inválido: ${grupoMuscular}` 
      });
    }
    
    // Gerar _id se não fornecido
    const treinoData = {
      ...req.body,
      _id: req.body._id || Date.now().toString() + Math.random().toString(36).substr(2, 9)
    };
    
    const novo = new Treino(treinoData);
    await novo.save();
    res.status(201).json(novo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { nome, grupoMuscular, gruposMusculares, exercicios } = req.body;
    
    // Validação: nome é obrigatório se fornecido
    if (nome !== undefined && (!nome || nome.trim() === '')) {
      return res.status(400).json({ error: 'Nome do treino não pode ser vazio' });
    }
    
    // Validar grupos musculares se fornecidos
    if (gruposMusculares && gruposMusculares.length > 0) {
      validarGruposMusculares(gruposMusculares);
    }
    
    // Validar grupo muscular único se fornecido
    if (grupoMuscular && !GRUPOS_MUSCULARES_VALIDOS.includes(grupoMuscular)) {
      return res.status(400).json({ 
        error: `Grupo muscular inválido: ${grupoMuscular}` 
      });
    }
    
    const treino = await Treino.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!treino) {
      return res.status(404).json({ error: 'Treino não encontrado' });
    }
    
    res.json(treino);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const treino = await Treino.findByIdAndDelete(req.params.id);
    
    if (!treino) {
      return res.status(404).json({ error: 'Treino não encontrado' });
    }
    
    res.json({ message: 'Treino deletado com sucesso', treino });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
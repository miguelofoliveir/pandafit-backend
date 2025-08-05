require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Configuração CORS mais permissiva
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'API PandaFit funcionando!' });
});

// Rotas
app.use('/api/usuarios', require('./routes/usuarioRoutes'));
app.use('/api/treinos', require('./routes/treinoRoutes'));
app.use('/api/exercicios', require('./routes/exercicioRoutes'));
app.use('/api/dieta', require('./routes/dietaRoutes'));
app.use('/api/historico', require('./routes/historicoRoutes'));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

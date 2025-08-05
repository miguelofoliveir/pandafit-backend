# 🐼 PandaFit Backend API

Backend da aplicação PandaFit - API REST para gerenciamento de treinos, exercícios, dietas e histórico de usuários.

## 📋 Índice

- [Tecnologias](#-tecnologias)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Uso](#-uso)
- [Endpoints](#-endpoints)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Models](#-models)
- [Contribuição](#-contribuição)

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB
- **dotenv** - Gerenciamento de variáveis de ambiente
- **cors** - Middleware para CORS

## 📦 Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/miguelofoliveir/pandafit-backend.git
   cd pandafit-backend
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

## ⚙️ Configuração

1. **Crie o arquivo `.env` na raiz do projeto:**
   ```env
   # MongoDB Connection
   MONGO_URI=mongodb://localhost:27017/pandafit
   # ou MongoDB Atlas:
   # MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/pandafit

   # Server Port
   PORT=8000
   ```

2. **Certifique-se que o MongoDB está rodando:**
   - **Local:** Instale e inicie o MongoDB
   - **Atlas:** Configure a string de conexão no `.env`
   - **Docker:** `docker run -d -p 27017:27017 --name mongodb mongo`

## 🎯 Uso

### Desenvolvimento
```bash
npm start
# ou
node app.js
```

O servidor estará rodando em: `http://localhost:8000`

### Teste de Conexão
```bash
curl http://localhost:8000/
# Resposta esperada: {"message": "API PandaFit funcionando!"}
```

## 📡 Endpoints

### 🔐 Autenticação

| Método | Endpoint | Descrição | Body |
|--------|----------|-----------|------|
| `POST` | `/api/usuarios/login` | Login de usuário | `{"_id": "admin", "senha": "senha123"}` |

**Resposta de sucesso:**
```json
{
  "message": "Login realizado com sucesso",
  "usuario": {"id": "admin"}
}
```

### 👤 Usuários

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/usuarios` | Listar todos os usuários |
| `POST` | `/api/usuarios` | Criar novo usuário |

### 💪 Exercícios

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/exercicios` | Listar todos os exercícios |
| `POST` | `/api/exercicios` | Criar novo exercício |

**Exemplo de criação:**
```json
{
  "nome": "Flexão",
  "series": "3x10",
  "tecnica": "Corpo reto, descida controlada",
  "urlVideo": "https://youtube.com/watch?v=example",
  "grupoMuscular": "Peito"
}
```

### 🏋️ Treinos

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/treinos` | Listar todos os treinos |
| `POST` | `/api/treinos` | Criar novo treino |

**Exemplo de criação:**
```json
{
  "_id": "treino-peito-01",
  "grupoMuscular": "Peito",
  "exercicios": ["flexao", "supino", "crucifixo"]
}
```

### 🥗 Dieta

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/dieta` | Listar todas as dietas |
| `POST` | `/api/dieta` | Criar nova dieta |

**Exemplo de criação:**
```json
{
  "horario": "08:00",
  "alimentos": [
    {
      "nome": "Aveia",
      "quantidade": "50g",
      "calorias": 190
    },
    {
      "nome": "Banana",
      "quantidade": "1 unidade",
      "calorias": 105
    }
  ]
}
```

### 📊 Histórico

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/historico` | Listar todo o histórico |
| `POST` | `/api/historico` | Criar novo registro |

**Exemplo de criação:**
```json
{
  "data": "2025-01-05",
  "tipo": "treino",
  "referencia": "treino-peito-01"
}
```

## 📁 Estrutura do Projeto

```
pandafit-backend/
├── 📁 config/
│   └── db.js                 # Configuração MongoDB
├── 📁 controllers/
│   ├── usuarioController.js  # Lógica de usuários
│   ├── exercicioController.js # Lógica de exercícios
│   ├── treinoController.js   # Lógica de treinos
│   ├── dietaController.js    # Lógica de dietas
│   └── historicoController.js # Lógica de histórico
├── 📁 models/
│   ├── Usuario.js            # Schema de usuário
│   ├── Exercicio.js          # Schema de exercício
│   ├── Treino.js             # Schema de treino
│   ├── Dieta.js              # Schema de dieta
│   └── Historico.js          # Schema de histórico
├── 📁 routes/
│   ├── usuarioRoutes.js      # Rotas de usuários
│   ├── exercicioRoutes.js    # Rotas de exercícios
│   ├── treinoRoutes.js       # Rotas de treinos
│   ├── dietaRoutes.js        # Rotas de dietas
│   └── historicoRoutes.js    # Rotas de histórico
├── .env                      # Variáveis de ambiente
├── .gitignore               # Arquivos ignorados pelo Git
├── app.js                   # Arquivo principal
├── package.json             # Dependências e scripts
└── README.md               # Documentação
```

## 🗄️ Models

### Usuario
```javascript
{
  _id: String,        // ID único do usuário
  senha: String       // Senha do usuário
}
```

### Exercicio
```javascript
{
  nome: String,           // Nome do exercício
  series: String,         // Séries e repetições
  tecnica: String,        // Descrição da técnica
  urlVideo: String,       // Link para vídeo demonstrativo
  grupoMuscular: String   // Grupo muscular trabalhado
}
```

### Treino
```javascript
{
  _id: String,            // ID único do treino
  grupoMuscular: String,  // Grupo muscular do treino
  exercicios: [String]    // Array de IDs de exercícios
}
```

### Dieta
```javascript
{
  horario: String,        // Horário da refeição
  alimentos: [            // Array de alimentos
    {
      nome: String,       // Nome do alimento
      quantidade: String, // Quantidade
      calorias: Number    // Calorias
    }
  ]
}
```

### Historico
```javascript
{
  data: String,           // Data do registro
  tipo: String,           // Tipo (treino, dieta, etc.)
  referencia: String      // Referência ao item
}
```

## 🔧 Códigos de Status

| Código | Descrição |
|--------|-----------|
| `200` | Sucesso |
| `201` | Criado com sucesso |
| `400` | Erro de validação |
| `401` | Não autorizado |
| `404` | Não encontrado |
| `500` | Erro interno do servidor |

## 🐛 Troubleshooting

### Porta em uso
Se a porta 8000 estiver em uso, mude no `.env`:
```env
PORT=3000
```

### Erro de conexão MongoDB
- Verifique se o MongoDB está rodando
- Confirme a string de conexão no `.env`
- Para MongoDB local: `mongodb://localhost:27017/pandafit`

### Erro de CORS
O CORS está configurado para aceitar todas as origens em desenvolvimento. Para produção, configure específicamente.

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença ISC.

---

**Desenvolvido com ❤️ para o PandaFit** 🐼💪
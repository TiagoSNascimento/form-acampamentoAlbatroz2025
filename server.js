const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname)); // para servir HTML/CSS/JS

// Criar ou abrir o banco de dados
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) return console.error(err.message);
  console.log('✅ Banco de dados conectado.');
});

// Criar tabela se não existir
db.run(`
  CREATE TABLE IF NOT EXISTS autorizacoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nomeDesbravador TEXT,
    idade INTEGER,
    nomeResponsavel TEXT,
    telefoneResponsavel TEXT,
    autorizacao BOOLEAN
  )
`);

// Rota para receber os dados
app.post('/enviar', (req, res) => {
  const { nomeDesbravador, idade, nomeResponsavel, telefoneResponsavel, autorizacao } = req.body;

  const stmt = db.prepare(`
    INSERT INTO autorizacoes 
    (nomeDesbravador, idade, nomeResponsavel, telefoneResponsavel, autorizacao) 
    VALUES (?, ?, ?, ?, ?)
  `);

  stmt.run(nomeDesbravador, idade, nomeResponsavel, telefoneResponsavel, autorizacao, function(err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ message: 'Erro ao salvar no banco de dados.' });
    }
    res.status(200).json({ message: 'Dados salvos com sucesso.' });
  });

  stmt.finalize();
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

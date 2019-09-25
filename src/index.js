const express = require('express');

const server = express();

// IMPORTANTE: para utilizar JSON no Body da requisicao
server.use(express.json());

// Middleware Global
server.use((req, res, next) => {
  console.log(`Método: ${req.method}; URL: ${req.url}`);
  
  return next();
});

function checaUsuarioExistente(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: 'É necessario o nome do usuario' });
  } 

  return next();
}

function checaUsuarioNoArray(req, res, next) {
  if (!usuarios[req.params.index]) {
    return res.status(400).json({ error: 'Usario nao existe' });
  }

  return next();
}

const usuarios = ['Junior', 'Marcos', 'Renato'];

server.get('/users', (req, res) => {
  return res.json( {'Listagem-de-usuarios': usuarios});
});

server.get('/users/:index', checaUsuarioNoArray, (req, res) => {
  const { index } = req.params;

  return res.json(usuarios[index]);
});

server.post('/users', checaUsuarioExistente, (req, res) => {
  const { name } = req.body;

  usuarios.push(name);

  return res.json(usuarios);
});

server.put('/users/:index', checaUsuarioExistente, checaUsuarioNoArray, (req, res) =>{
  const { index } = req.params;
  const { name } = req.body;

  usuarios[index] = name;

  return res.json(usuarios);
});

server.delete('/users/:index', checaUsuarioNoArray, (req, res) =>{
  const { index } = req.params;

  usuarios.splice(index, 1);

  return res.send();
});

server.listen(3000);


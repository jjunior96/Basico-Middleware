const { Router } = require('express');

const routes = new Router();

const usuarios = ['Junior', 'Marcos', 'Renato'];

routes.use((req, res, next) => {
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


routes.get('/users', (req, res) => {
  return res.json( {'Listagem-de-usuarios': usuarios});
});

routes.get('/users/:index', checaUsuarioNoArray, (req, res) => {
  const { index } = req.params;

  return res.json(usuarios[index]);
});

routes.post('/users', checaUsuarioExistente, (req, res) => {
  const { name } = req.body;

  usuarios.push(name);

  return res.json(usuarios);
});

routes.put('/users/:index', checaUsuarioExistente, checaUsuarioNoArray, (req, res) =>{
  const { index } = req.params;
  const { name } = req.body;

  usuarios[index] = name;

  return res.json(usuarios);
});

routes.delete('/users/:index', checaUsuarioNoArray, (req, res) =>{
  const { index } = req.params;

  usuarios.splice(index, 1);

  return res.send();
});

module.exports = routes;
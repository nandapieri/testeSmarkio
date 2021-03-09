/*inicialização do servidor - ouvondo na porta 5000*/
const app = require('./app');
const server = app.listen(5000, () => {
  console.log(`Express is running on port ${server.address().port}`);
});

const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const rewriter = jsonServer.rewriter(require('./routes.json'));

server.use(middlewares);
server.use(rewriter);
server.use(router);

server.post('/logout', (req, res) => {
  res.sendStatus(200);
});

server.listen(4000, () => {
  console.log('JSON Server is running on port 4000');
});

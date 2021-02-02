const jsonServer = require('json-server');

const { empty_response } = require('./data/util');
const {
  get_current,
  login,
  list_users,
  get_user,
  create_user,
  modify_user
} = require('./data/users');

const server = jsonServer.create();
const path = require('path');
const db = jsonServer.router(path.join(`${__dirname}/data/`, 'db.json'));
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlewares); // Set default middlewares (logger, static, cors and no-cache)

server.get('/users/current', get_current);
server.post('/users/login', login);

server.get('/users', list_users);
server.get('/users/:id', get_user);
server.patch('/users/:id', modify_user);
server.post('/users', create_user);
server.delete('/users/:id', empty_response);

server.use(db);

server.all('/404', (req, res) => {
  res.status(404).jsonp({});
});

server.listen(process.env.PORT || 4000, () =>
  console.log('JSON Server is running')
);

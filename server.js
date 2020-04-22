// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();

const todos = [
    { id: 1, name: 'Đi chợ' },
    { id: 2, name: 'Nấu cơm' },
    { id: 2, name: 'Rửa bát' },
    { id: 2, name: 'Học code tại CodersX' }
];

app.set('view engine', 'pug');
app.set('views', 'views');
app.use(express.json());
app.use(express.urlencoded({ extend: true }));

// https://expressjs.com/ewn/starter/basic-routing.html
app.get("/", (request, response) => {
  response.send('<h1>Todo List</h1><a href="/todos">Click me</a>');
});


app.get('/todos', (req, res) => {
    let { q } = req.query;
    res.render('todos', {
      todos: q ? todos.filter(todo => todo.name.toLowerCase().indexOf(q) !== -1) : todos,
      q
    });
});

app.post('/todos/create', (req, res) => {
  const { todo } = req.body;
  if (!todo) return res.redirect('/todos');
  todos.push({ id: new Date(), name: todo });
  res.render('todos', { todos });
});

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});

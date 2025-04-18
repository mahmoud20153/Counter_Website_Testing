const express = require('express');
const app = express();
app.use(express.json());

let todos = [
    { id: 1, title: "Learn Node.js", completed: false },
    { id: 2, title: "Read Express docs", completed: true }
];

// Get all todos
app.get('/todos', (req, res) => {
    res.json(todos);
});

// Get a single todo by ID
app.get('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (todo) {
        res.json(todo);
    } else {
        res.status(404).send("Todo not found");
    }
});

// Add a new todo
app.post('/todos', (req, res) => {
    const newTodo = { id: todos.length + 1, completed: false, ...req.body };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// Update a todo
app.put('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (todo) {
        Object.assign(todo, req.body);
        res.json(todo);
    } else {
        res.status(404).send("Todo not found");
    }
});

// Delete a todo
app.delete('/todos/:id', (req, res) => {
    todos = todos.filter(t => t.id !== parseInt(req.params.id));
    res.status(204).send();
});

app.listen(3000, () => console.log('Todo API is running on http://localhost:3000'));

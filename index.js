const express = require('express');
const app = express();
app.use(express.json());
const port = 3040;

const customers = [
  { id: 1, name: "john" },
  { id: 2, name: "doe" },
];

// request handler 
// syntax - app.httpMethod(url, callback function);
app.get('/', (req, res) => {
    res.send('welcome to the website');
});

// read operation
app.get('/customers', (req, res) => {
    res.json(customers);
});

app.get('/customers/:id', (req, res) => {
    const id = req.params.id;
    const customer = customers.find(customer => customer.id == id);
    if (customer) {
        res.json(customer);
    }
    else {
        res.json({});
    }
});

// create operation
app.post('/customers', (req, res) => {
    const body = req.body;
    res.json(body);
});

// update operation
app.put('/customers/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;
    res.send('put request sent to server to update');
});

// delete operation
app.delete('/customers/:id', (req, res) => {
    const id = req.params.id;
    res.send(`delete request sent to server to delete ${id}`);
});

app.listen(port, () => {
    console.log('server running on port : ', port);
});
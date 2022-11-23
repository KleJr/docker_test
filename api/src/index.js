const express = require('express');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
    host: 'mysql-container',
    user: 'root',
    password: 'senha',
    database: 'bd_dockertest'
});

connection.connect();

app.get('/products', function (req, res) {
    connection.query('SELECT * FROM products', function (error, results) {
        if (error) { console.log(error) };

        res.send(results.map(item => ({ name: item.name, price: item.price })));
    });
});


app.listen(9001, '0.0.0.0', function () {
    console.log('server rodando: porta 9001')
});
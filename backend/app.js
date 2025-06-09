const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const port = 3000;

const app = express();
app.use(bodyParser.json());

// MySQL Connection Body
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Yruan@0601',
    database: 'portfolio',
});

// MySQL connection
db.connect(err => {
    if (err) {
        console.error('Error to connect database: ', err.message);
        throw err;
    };

    console.log('Connected on database!');
})

// CREATE
app.post('/projetos', (req, res) => {
    const{ nome, descricao } = req.body;
    const sql = 'INSERT INTO projetos (nome, descricao) VALUES (?, ?)';

    db.query(sql, [nome, descricao], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ id: result.insertId, nome, descricao});
    });
});

// READ
app.get('/projetos', (req, res) => {
    const sql = 'SELECT * FROM projetos';
    
    db.query(sql, (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(result);
    });
});

// READ by id
app.get('/projetos/:id', (req, res) => {
    const sql = 'SELECT * FROM projetos WHERE id = ?';
    
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(result);
    });
});

// UPDATE
app.put('/projetos/:id', (req, res) => {
    const {nome, descricao} = req.body;
    const sql = 'UPDATE projetos SET nome = ?, descricao = ? WHERE id = ?';

    db.query(sql, [nome, descricao, req.params.id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({mensagem: 'Projeto atualizado com sucesso!'});
    });
});

// DELETE
app.delete('/projetos/:id', (req, res) => {
    const sql = 'DELETE FROM PROJETOS WHERE id = ?';

    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({mensagem: 'Projeto excluído com sucesso!'})
    });
});

// Server Initialize
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
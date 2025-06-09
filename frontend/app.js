const express = require('express');
const app = express();
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const port = 3000;

const path = require('path');
const { title } = require('process');

app.use(bodyParser.json());

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

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use(express.static(path.join(__dirname, 'src', 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/projects', (req, res) => {
    // const projetos = [
    //     {
    //         nome: 'PontoLog',
    //         descricao: 'API (Aprendizagem por Projetos Integrados) 3º Semestre - Aplicação Web para o Acompanhamento dos Resultados de Importação e Exportação dos Estados',
    //         url: 'https://github.com/CodeDontBlow/PontoLog',
    //         tecnologias: ['React.js', 'Node.js', 'Typescript', 'Express', 'Python', 'PostgreSQL', 'AWS', 'REDIS', 'Git', 'GitHub'],
    //         imagem: '/img/PontoLog.svg',
    //     },
    //     {
    //         nome: 'DocEye',
    //         descricao: 'API (Aprendizagem por Projetos Integrados) 2º Semestre - Software para automatização de extração de informações',
    //         url: 'https://github.com/CodeDontBlow/DocEye',
    //         tecnologias: ['Java', 'Ollama', 'Ollama4j', 'TesseractOCR', 'IntelliJ', 'MySQL', 'Git', 'GitHub'],
    //         imagem: '/img/Doceye.png',
    //     },
    //     {
    //         nome: 'ScrumTutor',
    //         descricao: 'API (Aprendizagem por Projetos Integrados) 1º Semestre - WebSite interativo sobre a metodologia Scrum',
    //         url: 'https://github.com/CodeDontBlow/Scrum-Tutor',
    //         tecnologias: ['HTML', 'CSS', 'Python', 'Flask', 'BootStrap', 'JavaScript', 'MySQL'],
    //         imagem: '/img/ScrumTutor.svg',
    //     }];

    const sql = 'SELECT * FROM projetos';

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Erro ao buscar projetos:', err.message);
            return res.status(500).send('Erro ao carregar os projetos');
        }

        const projetos = result.map(p => ({
            nome: p.nome,
            descricao: p.descricao,
            imagem: "/img/ScrumTutor.svg"
        }));

        res.render('projects', { title: 'projetos', projetos });
    });
});

app.get('/certificates', (req, res) => {
    const certificados = [
        {
            nome: 'Santander - Linux Para Iniciantes',
            descricao: 'Curso com carga de 30 horas focado na utilização do linux ubuntu server, onde aprendi coisas como instalação do ubuntu server, gerencimento de usuários e permissões, comandos básicos, etc.',
            url: 'https://drive.google.com/file/d/1_4GdvZRf8FkZSBLZdmttcWK1WgmWnEu_/view?usp=sharing',
            tecnologias: ['Linux', 'Ubuntu Server', 'OracleVM', 'AWS'],
            imagem: '/img/certificado-linux.jpg'
        },
        {
            nome: 'Santander - Backend com Java',
            descricao: 'Curso com carga de 80 horas focado na utilização da linguagem Java para desenvolvimento Backend, onde aprendi de conceitos básicos a conceitos mais avançados de forma prática com projetos baseados em problemas reais.',
            url: 'https://drive.google.com/file/d/1hMjYx9c7FTLXYFR4wjN0M_PEpuTcIFS7/view?usp=sharing',
            tecnologias: ['Java', 'IntelliJ', 'SpringBoot', 'Apache Maven'],
            imagem: '/img/certificado-java.jpg'
        }
    ];

    res.render('certificates', { title: 'certificados', certificados });
});


// CREATE
app.post('/projetos', (req, res) => {
    const { nome, descricao } = req.body;
    const sql = 'INSERT INTO projetos (nome, descricao) VALUES (?, ?)';

    db.query(sql, [nome, descricao], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ id: result.insertId, nome, descricao });
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
    const { nome, descricao } = req.body;
    const sql = 'UPDATE projetos SET nome = ?, descricao = ? WHERE id = ?';

    db.query(sql, [nome, descricao, req.params.id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ mensagem: 'Projeto atualizado com sucesso!' });
    });
});

// DELETE
app.delete('/projetos/:id', (req, res) => {
    const sql = 'DELETE FROM PROJETOS WHERE id = ?';

    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ mensagem: 'Projeto excluído com sucesso!' })
    });
});

// Server Initialize
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
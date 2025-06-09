const express = require('express');
const app = express();
const port = 5000;

const path = require('path');
const { title } = require('process');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use(express.static(path.join(__dirname, 'src', 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/projects', (req, res) => {
    const projetos = [
        {
            nome: 'PontoLog',
            descricao: 'API (Aprendizagem por Projetos Integrados) 3º Semestre - Aplicação Web para o Acompanhamento dos Resultados de Importação e Exportação dos Estados',
            url: 'https://github.com/CodeDontBlow/PontoLog',
            tecnologias: ['React.js', 'Node.js', 'Typescript', 'Express', 'Python', 'PostgreSQL', 'AWS', 'REDIS', 'Git', 'GitHub'],
            imagem: '/img/PontoLog.svg',
        },
        {
            nome: 'DocEye',
            descricao: 'API (Aprendizagem por Projetos Integrados) 2º Semestre - Software para automatização de extração de informações',
            url: 'https://github.com/CodeDontBlow/DocEye',
            tecnologias: ['Java', 'Ollama', 'Ollama4j', 'TesseractOCR', 'IntelliJ', 'MySQL', 'Git', 'GitHub'],
            imagem: '/img/Doceye.png',
        },
        {
            nome: 'ScrumTutor',
            descricao: 'API (Aprendizagem por Projetos Integrados) 1º Semestre - WebSite interativo sobre a metodologia Scrum',
            url: 'https://github.com/CodeDontBlow/Scrum-Tutor',
            tecnologias: ['HTML', 'CSS', 'Python', 'Flask', 'BootStrap', 'JavaScript', 'MySQL'],
            imagem: '/img/ScrumTutor.svg',
        }]


    res.render('projects', { title: 'projetos', projetos });
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

app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
}); 
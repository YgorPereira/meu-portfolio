const express = require('express');
const app = express();
const port = 3000;

const path = require('path');

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
            imagem:'/img/PontoLog.svg',
        },
        {
            nome: 'DocEye',
            descricao: 'API (Aprendizagem por Projetos Integrados) 2º Semestre - Software para automatização de extração de informações',
            url: 'https://github.com/CodeDontBlow/DocEye',
            tecnologias: ['Java', 'Ollama', 'Ollama4j', 'TesseractOCR', 'IntelliJ', 'MySQL', 'Git', 'GitHub'],
            imagem:'/img/Doceye.png',
        },
        {
            nome: 'ScrumTutor',
            descricao: 'API (Aprendizagem por Projetos Integrados) 1º Semestre - WebSite interativo sobre a metodologia Scrum',
            url: 'https://github.com/CodeDontBlow/Scrum-Tutor',
            tecnologias: ['HTML', 'CSS', 'Python', 'Flask', 'BootStrap', 'JavaScript', 'MySQL'],
            imagem:'/img/ScrumTutor.svg',
        }]


    res.render('projects', { title: 'projetos', projetos });
});

app.get('/certificates', (req, res) => {
    res.render('certificates');
});

app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
}); 
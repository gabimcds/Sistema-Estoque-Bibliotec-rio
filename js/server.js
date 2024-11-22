//Pesquisar por Titulo

const express = require('express');
const app = express();
const port = 3000;

// Mock database
const livros = [
    // Exemplos de dados
    { id: 1, titulo: "Livro A", categoria: "Ficção", idioma: "Português", faixaEtaria: "12+", nPaginas: 200 },
    { id: 2, titulo: "Livro B", categoria: "Não-Ficção", idioma: "Inglês", faixaEtaria: "16+", nPaginas: 300 }
];

app.get('/agendar', (req, res) => {
    const titulo = req.query.titulo;
    const resultado = livros.filter(livro => livro.titulo.toLowerCase().includes(titulo.toLowerCase()));
    res.json(resultado);
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

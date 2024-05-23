const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/logar', (req, res) => {
    const { usuario, senha } = req.body;

    // Lendo as informações de login do arquivo JSON
    fs.readFile('login.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo JSON:', err);
            return res.status(500).send('Erro interno do servidor');
        }

        try {
            const loginData = JSON.parse(data);

            
            const usuarioEncontrado = loginData.login.find(login => login.usuario === usuario && login.senha === senha);

            if (usuarioEncontrado) {
                console.log('Login efetuado com sucesso');
                res.status(200).send('Login efetuado com sucesso');
            } else {
                console.log('Usuário ou senha incorretos');
                res.status(401).send('Usuário ou senha incorretos');
            }
        } catch (error) {
            console.error('Erro ao analisar o JSON:', error);
            res.status(500).send('Erro interno do servidor');
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

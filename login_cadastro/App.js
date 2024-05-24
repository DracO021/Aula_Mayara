const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'elton',
    password: 'SENAI123',
    database: 'LOGIN'
});

db.connect((error) => {
    if (error) {
        console.log('Erro ao conectar com o MySQL');
    } else {
        console.log('Conectado ao MySQL');
    }
});

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query('SELECT password FROM user WHERE username = ?', [username], (error, results) => {
        if (error) {
            console.error('Erro ao executar a query:', error);
            res.status(500).send('Erro no servidor');
            return;
        }

        if (results.length > 0) {
            const passwordBD = results[0].password;
            if (password === passwordBD) {
                console.log("Login bem sucedido");
                res.send('Login bem sucedido');
            } else {
                console.log("Senha incorreta");
                res.send('Senha incorreta');
            }
        } else {
            console.log('Usuário não cadastrado!');
            res.send('Usuário não cadastrado!');
        }
    });
});

app.get("/cadastro", (req, res) => {
    res.sendFile(__dirname + '/cadastro.html');
});

app.post("/cadastro", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const confirm = req.body.passwordConfirm;

    /*if(password === confirm){
        db.query('INSERT INTO user (username, password) VALUES (?, ?)', [username, password], (error, results) => {
            if(error){
                console.log("Erro ao realizar o cadastro", error)
            }else{
                console.log("Usuário Cadastro com sucesso!")
            }
        })
    }else{
        console.log('Senhas não coincidem')
    }*/

    if(password === confirm) {
        db.query('INSERT INTO user (username, password) VALUES (?, ?)', [username, password], (error, results) => {
            if (error) {
                console.log('Erro ao cadastrar', error);
                res.status(500).send('Erro no servidor');
            }
            console.log('Usuário cadastrado com sucesso!');
            res.send('Usuário cadastrado com sucesso!');
        });
    } else {
        console.log('Senhas não Coincidem')
        res.status(500).send('Senhas não coincidem')
    }
   
});

app.listen(port, () => {
    console.log(`Servidor rodando no endereço: http://localhost:${port}`)
});
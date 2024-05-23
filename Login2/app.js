const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'elton',
    password: 'SENAI123',
    database: 'LOGIN'
})

db.connect((error) => {
    if(error){
        console.log('Erro ao conectar com o MySQL');
    } else {
        console.log('Conectado com sucesso')
    }
})

app.use(bodyParser.urlencoded({ extended:true}))

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/login.html')
})

app.post("/login", (req, res) => {
    const username = req.body.usuario;
    const password = req.body.senha;
    
    db.query('SELECT password FROM User WHERE username = ?', [password], (error, results) =>{
        if(results.length > 0) {
            const passwordBD = results[0].password;
        }else {
            console.log('Senha Incorreta')
        }
    })

    db.query('SELECT password FROM User WHERE username = ?', [username], (error, results) =>{
        if(results.length > 0) {
            const usernameBD = results[0].username;
        }else {
            console.log('Usuário Incorreto')
        }
    })
})

app.listen(port, ()=> {
    console.log(`Servidor rodando no endereço: http://localhost:${port}`)
})
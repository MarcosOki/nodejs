const express = require("express");
const path = require("path");
const app = express();
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const { json } = require("body-parser");

const host = "containers-us-west-125.railway.app";
const port = 7393;
const user = "root";
const senha = "MPWCfYYOBzRj73c0zXzA";
const db = "railway";

const connection = mysql.createConnection({
  host: host, //seu host
  port: port, //porta
  user: user, //seu usuário
  password: senha, //senha
  database: db, //nome do seu banco de dados
});

connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
    return;
  }
  console.log("Conectado ao banco de dados MySQL!");
});

const PORTA = process.env.PORT || 5000;

//Configurar bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/html" + "/index.html"));
});

app.post("/enviar", (req, res) => {
  var mensagem = req.body.mensagem;
  if (mensagem != "") {
    let adicionar_msg = `INSERT INTO mensagens(mensagem) VALUES ('${mensagem}')`;
    connection.query(adicionar_msg, (error, results, fields) => {
      if (error) {
        console.log("ocorreu um erro ao executar", error);
        return;
      }
      res.sendFile(path.join(__dirname + "/html" + "/resposta.html"));
      console.log(`Resultados${results}`);
    });
  } else {
    res.send("adicione algo na caixa de texto");
  }
});

//RodarServidor
app.listen(PORTA, () => {
  console.log("Rodando na porta " + PORTA);
});

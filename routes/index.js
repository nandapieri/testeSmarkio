/*
Rotas das requisições feitas pelo cliente
*/

const express = require('express');
const { check, validationResult } = require('express-validator');

const router = express.Router();

//conecta com o banco de dados
(async () => {
    const database = require('../db');
    try {
        const resultado = await database.sync();
        console.log('conectado');

    } catch (error) {
        console.log(error);
    }
})();


/*ROTAS*/
//rota do root - testes
router.get('/', (req, res) => {
  res.render('form', { title: 'Comentarios' });
});

//pagina inicial do desafio
router.get('/desafio', (req, res) => {
  //busca a lista de comentários no banco de dados para exibir
  var models = require('../models');
  var Comentarios = models.Comentarios;
  //const Comentario = require('../models/comentario');
  const comentarios = Comentarios.findAll({ order: [['id', 'DESC']] })
    .then((comentarios) => {
      res.render('desafio', { title: 'Comentarios', comentarios });
      //console.log(Comentario.findAll({ order: [['id', 'DESC']] }));
    })
    .catch((err) => { res.send('Sorry! Something went wrong. '+err); });
  });

var dialog = require('dialog');
router.post('/',
  //validação se o campo de comentario está vazio
  [
    check('texto')
      .isLength({ min: 1 }),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty() ) {
      var str = JSON.stringify(req.body);
      //verifica se a quantidade de caracteres digitada cabe no campo do banco de dados
      if (str.length <= 260) {
        //adiciona o comentario no banco de dados
        var models = require('../models');
        var Comentarios = models.Comentarios;
        const resultadoCreate = Comentarios.create(req.body).then( () => {
          //recarrega a pagina inicial depois de adicionar o comentario
          res.redirect('/desafio');
          }
        )
      }
      else {
        dialog.err('Seu comentário excedeu o numero de caracteres permitido');
      }
    } else {
      dialog.err('Por favor, digite um comentario antes de enviar');

    }
  }
);

//rota da conversão de texto para audio
require('dotenv/config');
router.post("/speech", async function(req, res) {
   const fs = require('fs');
   const watson = require ('../watson');
   var input;
   input = req.body.texto;
   var id = req.body.id;
   var path = 'audio/speech'+id+'.mp3';

   //verifica se o arquivo já existe. se não existir, chama a conversão
   if (!fs.existsSync(path)) {
     //faz a conversão do texto para audio
     console.log("req: "+input);
     const result = await watson.synthesize_audio(input, path)
    }

   //manda a resposta do POST
   var returnData = {};
   fs.readFile(path, function(err, file){
        var base64File = new Buffer(file, 'binary').toString('base64');
        returnData.fileContent = base64File;
        res.json(returnData);
    });

 });

 //rota para acessar a pasta audio onde ficam os audios renderizados
  router.get('/audio', (req, res) => {

    var queryString = req.protocol + '://' + req.get('host') + req.originalUrl;
    const urlParams = new URLSearchParams(queryString.replace('?','&'));
    const id = urlParams.get('id')
    var path = 'audio/speech'+id+'.mp3';
    res.sendfile(path)

  });

//limpa a pasta audio
  function deleteAll() {
    const fs = require('fs');
    const path = require('path');

    const directory = 'audio';

    fs.readdir(directory, (err, files) => {
      if (err) throw err;

      for (const file of files) {
        fs.unlink(path.join(directory, file), err => {
          if (err) throw err;
        });
      }
    });
  }


module.exports = router;

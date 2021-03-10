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

router.get('/', (req, res) => {
  res.render('form', { title: 'Comentarios' });
});

router.get('/desafio', (req, res) => {
  const Comentario = require('../models/comentario');
  const comentarios = Comentario.findAll({ order: [['id', 'DESC']] })
    .then((comentarios) => {
      res.render('desafio', { title: 'Comentarios', comentarios });
      //console.log(Comentario.findAll({ order: [['id', 'DESC']] }));
    })
    .catch(() => { res.send('Sorry! Something went wrong.'); });
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
        const Comentario = require('../models/comentario');
        const resultadoCreate = Comentario.create(req.body).then( () => {
          //recarrega a pagina inicial depois de adicionar o comentario
          res.redirect('/desafio');
          }
        )
      }
      else {
        dialog.err('Seu comentário excedeu o numero de caracteres permitido');
      }
      //res.render('form', { title: 'Comentarios' });
    } else {
      dialog.err('Por favor, digite um comentario antes de enviar');

    }
  }
);

require('dotenv/config');
router.post("/speech", async function(req, res) {
   const fs = require('fs');
   const url = require('url');
   const watson = require ('../watson');
   var input;
   input = req.body.texto;

   console.log("req: "+input);
   const result = await watson.synthesize_audio(input, 'audio/speech.mp3')
    .then(() => {
      console.log('teste');
      //const sound = require("sound-play");
      //sound.play("audio.mp3");
    })

    var returnData = {};

    fs.readFile('audio/speech.mp3', function(err, file){
        var base64File = new Buffer(file, 'binary').toString('base64');

        returnData.fileContent = base64File;

        res.json(returnData);
    });

/*
    var filePath = 'audio/audio.mp3'
    fs.exists(filePath, function(exists){
      if (exists) {
        /*res.writeHead(200, {
          "Content-Type": "text/plain"
          //"Content-Type": "audio/mp3",
          //"Content-Disposition": "attachment; filename="+filePath
        });

        var myUrl = url.pathToFileURL('audio/audio.mp3');
        console.log(myUrl.href)
        res.send(myUrl.href);

        //fs.createReadStream(filePath).pipe(res);
        //console.log(res.get('Content-Disposition'));
      } else {
        res.writeHead(400, {"Content-Type": "text/plain"});
        res.end("ERROR File does not exist");
      }
    });
*/
   //res.attachment('audio.mp3');
   //res.contentType("audio/mp3");
   //res.status(200).send(result);

 });
 //rota para acessar a pasta audio
  router.get('/audio', (req, res) => {
    res.sendfile('audio/speech.mp3')
    //res.redirect('/desafio');
  });


  router.get('/delete', (req, res) => {
    //apagar o arquivo ao ser tocado
    const fs = require('fs');
    fs.unlink('audio/speech.mp3', (err) => {
      if (err) throw err;
      console.log('audio/speech.mp3 was deleted');
    });
  });


module.exports = router;

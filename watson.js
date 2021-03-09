/*
  Conexão com o IBM Watson
*/

exports.synthesize_audio =  async function synthesize_audio(text, mp3Path) {
    const fs = require('fs');

    const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1-generated');
    const { IamAuthenticator } = require('ibm-watson/auth');
    const { IamTokenManager } = require('ibm-watson/auth');

    return new Promise((resolve, reject) => {

      //cria o obj text to speech
      const textToSpeech = new TextToSpeechV1({
        authenticator: new IamAuthenticator({
          apikey: process.env.TEXT_TO_SPEECH_IAM_APIKEY,
        }),
        url: process.env.TEXT_TO_SPEECH_URL,
      });

      //paramentros para a criação do audio
      const synthesizeParams = {
        text: text,
        accept: 'audio/mp3',
        voice: 'pt-BR_IsabelaV3Voice',
      };

      //solicitação do audio para a api IBM Watson
      textToSpeech.synthesize(synthesizeParams)
      .then(audio => {
        audio.result
              .pipe(fs.createWriteStream(mp3Path))
              .on('finish', resolve)
              .on('error', reject);
      })
      .catch(err => {
        console.log('error:', err);
      });

    });


}

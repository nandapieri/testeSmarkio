/*
  Script do botão ouvir
*/

function playAudio(clicked_id) {

  //busca o texto a ser enviado na pagina
  var i = clicked_id.substring(3);
  var texto = document.getElementById("p"+i).innerHTML

  //cria os dados para a requisição
  let fetchData = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({'texto':texto, 'id':i})
  }

  //faz a requisição do audio
  fetch("/speech",fetchData)
    .then(function(res){
      //toca o audio gerado
      var audio = new Audio('http://localhost:5000/audio?id='+i);
      audio.play(audio);
      //alert('oi');
    });

}

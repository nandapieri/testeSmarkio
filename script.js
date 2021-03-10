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
    body: JSON.stringify({'texto':texto})
  }

  //faz a requisição e aguarda uma resposta
  fetch("/speech",fetchData)
    .then(function(res){

      var audio = new Audio('/audio');
      audio.play(audio);
      //alert(res.status);
    });

  /*fetch("/delete")
    .then ( (res) => {
      alert(res.status);
    });
*/
  //window.location.reload(true);
}

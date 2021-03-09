/*
  Script do botão ouvir
*/

function playAudio(clicked_id) {

  //cria a requisição
  var req = new XMLHttpRequest();
  req.open("POST", "/speech", true);
  req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  //busca o texto a ser enviado na pagina
  var i = clicked_id.substring(3);
  var texto = document.getElementById("p"+i).innerHTML

  //envia a requisição com o texto
  req.send('texto='+texto);

  //recebe o audio de resposta e toca o mesmo.

  //var audio = new Audio('');
  //audio.play(req.response);
  if (req.status == 200) {
      alert('entrei');
      //audio.play(req.response);
  }

  alert(req.status);

}

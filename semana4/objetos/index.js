const posts = JSON.parse( localStorage.getItem( "posts" ) ) || [];

function criarPost() {

  const titulo = document.getElementById( "titulo-post" );
  const autor = document.getElementById( "autor-post" );
  const conteudo = document.getElementById( "conteudo-post" );
  const imagem = document.getElementById( "imagem-post" );

  if( !titulo.value || !autor.value || !conteudo.value ) {

    titulo.value = "";
    autor.value = "";
    conteudo.value = "";
    imagem.value = "";

    return alert( "Os campos não foram preenchidos corretamente" );

  }

  const novoPost = {
    "titulo":   titulo.value,
    "autor":    autor.value,
    "conteudo": conteudo.value,
    "imagem":   imagem.value
  };

  posts.push( novoPost );

  titulo.value = "";
  autor.value = "";
  conteudo.value = "";
  imagem.value = "";

  localStorage.setItem( "posts", JSON.stringify( posts ) );

  location.href = "/posts.html";

}

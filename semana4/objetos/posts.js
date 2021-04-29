const posts = JSON.parse( localStorage.getItem( "posts" ) ) || [];

function mostrarPost() {

  for( const post of posts )
    document.getElementById( "container-de-posts" ).innerHTML +=
`<article>
  <h2>Título</h2>
  <p>${ post.titulo }</p>
  <h2>Conteúdo</h2>
  <p>${ post.conteudo }</p>
  <img src="${ post.imagem }" >
  <h2>Autor</h2>
  <p>${ post.autor }</p>
</article>`;

}

mostrarPost();

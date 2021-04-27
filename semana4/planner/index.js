function gerarIdUnico() {

  let indice = 0;
  const tamanhoArray = 10;
  const array = new Uint32Array( tamanhoArray );

  window.crypto.getRandomValues( array );

  while( document.getElementById( array[ indice ] ) ) {

    indice++;
    if( indice >= tamanhoArray ) {

      indice = 0;
      window.crypto.getRandomValues( array );

    }

  }

  return array[ indice ];

}

function criarTarefa() {

  const diaSelecionado = document.getElementById( "dias-semana" );
  const horario = document.getElementById( "horario" );
  const [ dia ] = document.getElementById( diaSelecionado.value )
    .getElementsByClassName( horario.value );
  const tarefa = document.getElementById( "tarefa" );

  if( tarefa.value !== "" ) {

    const _id = gerarIdUnico();
    dia.innerHTML +=
      `<p id="${ _id }" onclick="riscarTarefa(${ _id })">- ${ tarefa.value }</p>`;
    tarefa.value = "";
    horario.value = 0;
    diaSelecionado.value = "domingo";

  }

}

function riscarTarefa( id ) {

  const tarefa = document.getElementById( id );

  if( tarefa && !tarefa.className.match( /riscado/ ) )
    if( tarefa.className )
      tarefa.className += " riscado";
    else
      tarefa.className = "riscado";

}

function limparTarefas() {

  const dias = [
    "domingo",
    "segunda",
    "terca",
    "quarta",
    "quinta",
    "sexta",
    "sabado"
  ];

  for( const dia of dias )
    for( let horario = 0; horario < 24; horario++ )
      document.getElementById( dia ).getElementsByClassName( horario )[ 0 ]
        .innerHTML = "";

}


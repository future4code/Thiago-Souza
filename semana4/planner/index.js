function criarTarefa() {

  const diaSelecionado = document.getElementById( "dias-semana" );
  const horario = document.getElementById( "horario" );
  const [ dia ] = document.getElementById( diaSelecionado.value )
    .getElementsByClassName( horario.value );
  const tarefa = document.getElementById( "tarefa" );

  if( tarefa.value !== "" ) {

    dia.innerHTML += `<p onclick="riscarTarefa(this)">- ${ tarefa.value }</p>`;
    tarefa.value = "";
    horario.value = 0;
    diaSelecionado.value = "domingo";

  }

}

function riscarTarefa( tarefa ) {

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


/*eslint-disable no-console, no-undef*/

console.log( "Bem vindo ao jogo de Blackjack!" );

if( confirm( "Quer iniciar uma nova rodada?" ) ) {

  let usuario = {
    "cartas": "A  A ",
    "valor":  22
  };

  let computador = {
    "cartas": "A  A ",
    "valor":  22
  };

  while( usuario.cartas.match( /A.*A/ ) || computador.cartas.match( /A.*A/ ) ) {

    const usuarioComprar = [ comprarCarta(), comprarCarta() ];
    const computadorComprar = [ comprarCarta(), comprarCarta() ];

    usuario = {
      "cartas": `${ usuarioComprar[ 0 ].texto } ${ usuarioComprar[ 1 ].texto }`,
      "valor":  usuarioComprar[ 0 ].valor + usuarioComprar[ 1 ].valor
    };

    computador = {
      "primeiraCarta": computadorComprar[ 0 ].texto,
      "cartas":
        `${ computadorComprar[ 0 ].texto } ${ computadorComprar[ 1 ].texto }`,
      "valor": computadorComprar[ 0 ].valor + computadorComprar[ 1 ].valor
    };

  }

  while( usuario.valor < 21 && confirm( `Suas cartas são ${ usuario.cartas }. 
A carta revelada do computador é ${ computador.primeiraCarta }.
Deseja comprar mais uma carta?
  ` ) ) {

    const carta = comprarCarta();

    usuario = {
      "cartas": `${ usuario.cartas  } ${  carta.texto }`,
      "valor":  usuario.valor + carta.valor
    };

  }

  while( usuario.valor <= 21 && usuario.valor >= computador.valor  ) {

    const carta = comprarCarta();

    computador = {
      ...computador,
      "cartas": `${ computador.cartas  } ${  carta.texto }`,
      "valor":  computador.valor + carta.valor
    };

  }

  console.log( `Suas cartas são ${ usuario.cartas }. Sua pontuação é ${ usuario.valor }` );
  console.log( `As cartas do computador são ${ computador.cartas }.A pontuação do computador é ${ computador.valor }` );

  if( usuario.valor === computador.valor )
    console.log( "Empate!" );
  else if( usuario.valor > 21 ||
    computador.valor <= 21 && computador.valor > usuario.valor  )
    console.log( "O computador ganhou!" );
  else
    console.log( "O usuário ganhou!" );

} else {

  console.log( "O jogo acabou" );

}


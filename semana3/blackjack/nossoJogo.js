/*eslint-disable no-console, no-undef*/

console.log( "Bem vindo ao jogo de Blackjack!" );

if( confirm( "Quer iniciar uma nova rodada?" ) ) {

  const usuarioComprar = [ comprarCarta(), comprarCarta() ];
  const computadorComprar = [ comprarCarta(), comprarCarta() ];

  const usuario = {
    "cartas": usuarioComprar[ 0 ].texto + usuarioComprar[ 1 ].texto,
    "valor":  usuarioComprar[ 0 ].valor + usuarioComprar[ 1 ].valor
  };

  const computador = {
    "cartas": computadorComprar[ 0 ].texto + computadorComprar[ 1 ].texto,
    "valor":  computadorComprar[ 0 ].valor + computadorComprar[ 1 ].valor
  };

  console.log( `Usuário - cartas: ${ usuario.cartas } - pontuação ${ usuario.valor }` );
  console.log( `Computador - cartas: ${ computador.cartas } - pontuação ${ computador.valor }` );

  if( usuario.valor === computador.valor )
    console.log( "Empate!" );
  else if( usuario.valor > computador.valor )
    console.log( "O usuário ganhou!" );
  else
    console.log( "O computador ganhou!" );

} else {

  console.log( "O jogo acabou" );

}

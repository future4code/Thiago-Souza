/*eslint-disable no-console, prefer-destructuring */
/*Resolução dos exercícios de interpretação
  Exercício 1)
    O código está somando os números de 0 a 4, o resultado impresso será 10.

  Exercício 2)
    O código está impimindo todos números, da lista, que são maiores que 18.
    Não é suficiente usar o for...of... para acessar a o índice da lista,
    para isso seria melhor usar o laço for

  Desafio)
    0
    00
    000
    0000
*/

//Resolução dos exercícios de escrita

//Exercício 3
const numeros = [
  80,
  30,
  130,
  40,
  60,
  21,
  70,
  120,
  90,
  103,
  110,
  55
];

//A
for( const numero of numeros )
  console.log( numero );

//B
for( const numero of numeros )
  console.log( numero / 10 );

//C
const pares = [];

for( const numero of numeros )
  if( numero % 2 === 0 )
    pares.push( numero );

console.log( pares );

//D
for( let indice = 0; indice < numeros.length; indice++ )
  console.log( `O elemento do index ${ indice } é: ${ numeros[ indice ] }` );

//E
let maior = numeros[ 0 ];
let menor = numeros[ 0 ];

for( let indice = 1; indice < numeros.length; indice++ )
  if( maior < numeros[ indice ] )
    maior = numeros[ indice ];
  else if( menor > numeros[ indice ] )
    menor = numeros[ indice ];

console.log( `O maior número é ${ maior } e o menor número é ${ menor }` );

//Desafio 1 e 2
console.log( "Vamos Jogar!" );

/*Input para o desafio 1
  const numeroCerto =
    Number( prompt( "Digite o número que que você está pensando" ) );
*/

const numeroCerto = Math.floor( Math.random() * 100 ) + 1;
let tentativa;
let numeroTentativas = 0;

while( numeroCerto !== tentativa ) {

  tentativa = Number( prompt( "Faça um chute:" ) );
  numeroTentativas++;

  console.log( "O número chutado foi:", tentativa );

  if( tentativa > numeroCerto )
    console.log( "Errrrrrrrou, é menor" );

  else if( tentativa < numeroCerto )
    console.log( "Errrrrrrrou, é maior" );

}

console.log( "Acertou !!" );
console.log( "O número de tentativas foi:", numeroTentativas );

/*Acho que foi fácil a alteração do desafio 1 para o 2 pois eu só tive que mudar
  a linha onde o usuário 1 deveria colocar o número certo, não vejo como deixar
  mais fácil essa mudança pois só alterei uma linha de entrada e não alterei a
  lógica do jogo.*/

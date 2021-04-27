/*eslint-disable no-console, prefer-destructuring */
/*Resolução dos exercícios de interpretação
  Exercício 1)
    A) Vai ser impresso os números 10 e 50
    B) Não iria aparecer nada mas as funções iam ser execudatas normalmente
  Exercício 2)
    A) Ira imprimir os nomes Darvas e Caio
    B) Ira imprimir os nomes Amanda e Caio
  Exercício 3)
    Ele retorna o array só com os números pares e esse números são
    elevado ao expoente 2, nome da função poderia ser paresAoQuadrado
*/

//Resolução dos exercícios de escrita

//Exercício 4
function minhasInformacoes() {

  //eslint-disable-next-line max-len
  console.log( "Eu sou Thiago, tenho 21 anos, moro em Várzea Grande, Mato Grosso e sou estudante da labenu e da UFRJ." );

}

minhasInformacoes();

function imprimirInformacoes( nome, idade, cidade, estudante ) {

  let souEstudante = "sou";
  if( !estudante )
    souEstudante = `não ${  souEstudante }`;

  //eslint-disable-next-line max-len
  console.log( `Eu sou ${ nome }, tenho ${ idade } anos, moro em ${ cidade } e ${ souEstudante } estudante.` );

}
imprimirInformacoes( "Caio", 23, "São Paulo", false );

//Exercício 5
function somarNumero( numero1, numero2 ) { return numero1 + numero2; }

console.log( somarNumero( 4, 5 ) );

function maiorIgual( numero1, numero2 ) { return numero1 >= numero2; }

console.log( maiorIgual( 4, 5 ) );
console.log( maiorIgual( 5, 5 ) );
console.log( maiorIgual( 5, 4 ) );

function imprimir10vezes( mensagem ) {

  for( let contador = 0; contador < 10; contador++ )
    console.log( mensagem );

}

imprimir10vezes( "Isso foi imprimido 10 vezes" );

//Exercício 6
const lista = [
  10,
  23,
  45,
  78,
  90,
  52,
  35,
  67,
  84,
  22
];

function tamanhoLista( lista ) { return lista.length; }

tamanhoLista( lista );

function ePar( numero ) { return numero % 2 === 0; }

ePar( lista[ 0 ] );
ePar( lista[ 1 ] );

function quantidadeDePares1( lista ) {

  let quantidade = 0;
  for( let indice = 0; indice < lista.length; indice++ )
    if( lista[ indice ] % 2 === 0 )
      quantidade++;

  return quantidade;

}

quantidadeDePares1( lista );

function quantidadeDePares2( lista ) {

  let quantidade = 0;
  for( let indice = 0; indice < lista.length; indice++ )
    if( ePar( lista[ indice ] ) )
      quantidade++;

  return quantidade;

}

quantidadeDePares2( lista );

//Desafio 1
const imprimir = ( mensagem ) => console.log( mensagem );
const somar = ( mensagem1, mensagem2 ) => imprimir( mensagem1 + mensagem2 );

somar( "Mensagem1 ", "Mensagem2" );
somar( 5, 4 );

//Desafio 2
const numeros = [
  0,
  8,
  23,
  16,
  10,
  15,
  41,
  12,
  13
];

function paresDobrados( lista ) {

  const pares = [];
  for( const numero of lista )
    if( ePar( numero ) )
      pares.push( numero * 2 );

  return pares;

}

console.log( paresDobrados( numeros ) );

function maiorNumero( lista ) {

  let maior = lista[ 0 ];
  for( const numero of lista )
    if( numero > maior )
      maior = numero;

  return maior;

}
console.log( maiorNumero( numeros ) );

function indiceMaiorNumero( lista ) {

  let maior = 0;
  for( let indice = 1; indice < lista.length; indice++ )
    if( lista[ indice ] > lista[ maior ] )
      maior = indice;

  return maior;

}
console.log( indiceMaiorNumero( numeros ) );

function listaInvertida( lista ) {

  const invertida = [];
  for( let indice = lista.length - 1; indice >= 0; indice-- )
    invertida.push( lista[ indice ] );

  return invertida;

}

console.log( listaInvertida( numeros ) );

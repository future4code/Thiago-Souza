/* Resolução dos exercícios de interpretação
  Exercício 1)
    O código pede uma entrada para o usuário e converte essa entrada para um número, ele verifica se esse número é par, se for par imprimi a mensagem "Passou no teste.", se essa entrada não for um núemro par(Número ímpares, NaN ou número decimais) era imprimir a mensagem "Não passou no teste.".

  Exercício 2)
    Esse código serve para deteminar o preço das frutas.
    Caso a fruta seja Maçã irá imprimir "O preço da fruta  Maçã  é  R$  2.25"
    Caso a fruta seja Pêra e retirássemos o break do case Pêra irá imprimir "O preço da fruta  Pêra  é  R$  5"

  Exercício 3)
    O código pede para o usuário digitar um número e verifica se esse número é maior que 0.
    Se o número for maior que zero(10) a seguinte mensagem irá ser impressa "Esse número passou no teste", ao contrário(-10) nada será imprimido
    O erro desse progrma é que a varíavel mensagem nunca será imprimida, para resolver isso poderíamos fazer uma declaração da variável antes do if, usar var invés do let ou imprimir a mensagem dentro do if
*/

// Resolução dos exercícios de escrita

// Exercício 4
const idade = Number(prompt("Qual é a sua idade?"));

if( idade >= 18 ) {
  console.log("Você pode dirigir.");
} else {
  console.log("Você não pode dirigir.");
}

// Exercício 5

const turno = prompt("Digite o seu turno que você estuda. M(Matutino), V(Vespertino) ou N(Noturno)").toUpperCase();

if( turno === "M" )
  console.log("Bom Dia!");
else if( turno === "V" )
  console.log("Boa Tarde!");
else if( turno === "N" )
  console.log("Boa Noite!");
else
  console.log("Turno Inválido :(");

// Exercício 6

switch( turno ){
  case "M":
    console.log("Bom Dia!");
  break
  case "V":
    console.log("Boa Tarde!");
    break
  case "N":
    console.log("Boa Noite!")
    break
  default:
    console.log("Turno Inválido :(")
}

// Exercício 7 com o Desafio 1

const genero = prompt("Digite o gênero do filme:").toLowerCase();
const preco = Number(prompt("O valor do ingresso:"));

if(genero === "fantasia" && preco < 15){
  const snack = prompt("Qual snack que você quer comprar?");
  console.log("Bom filme!");
  console.log("... com", snack);
}
else
  console.log("Escolha outro filme :(");

// Desafio 2

const valorSF = [1320, 880, 550, 220];
const valorDT = [660, 440, 330, 170];
const valorFI = [1980, 1320, 880, 330];
let valor = [];
let publicoCompleto = "Inválido";
let conversao = 0;
let simbolo = "R$";
let etapaCompleta = "Inválida";
let valorIngresso = "----";
let valorTotal = "----";

const nome = prompt("Digite seu nome");
let publico = prompt("Escolha o tipo do jogo.\n IN para jogo internacional ou DO para jogo doméstico:").toUpperCase();
const etapa = prompt("Escolha a etapa do jogo.\n SF para semi-final, DT para disputa  de terceiro e quarto lugar ou FI para a final:").toUpperCase();
let categoria = Number(prompt("Escolha a categoria 1, 2, 3 ou 4:"));
let quantidadeDeIngressos = Number(prompt("Quantidade de ingressos:"));

if( publico === "IN" ) {
  publicoCompleto = "Internacional";
  simbolo = "U$";
  conversao = 4.1;
} else if( publico === "DO" ) {
  publicoCompleto = "Nacional";
  conversao = 1;
}

switch( etapa ) {
  case "SF":
    etapaCompleta = "Semifinais";
    valor = valorSF;
    break;
  case "DT":
    etapaCompleta = "Decisão do 3ºlugar"
    valor = valorDT;
    break;
  case "FI":
    etapaCompleta = "Final"
    valor = valorFI;
    break;
}

if( !(quantidadeDeIngressos > 0) ) 
  quantidadeDeIngressos = "Inválida"

if( !(categoria >= 1 && categoria <= 4 ) )
  categoria = "Inválida"

if( conversao && valor.length && typeof quantidadeDeIngressos === "number" && typeof categoria === "number" ) {
  valorIngresso = valor[categoria - 1] / conversao;
  valorTotal = valorIngresso * quantidadeDeIngressos;
}

console.log("---Dados da compra---");
console.log("Nome do cliente: ", nome);
console.log("Tipo do jogo: ", publicoCompleto); 
console.log("Etapa do jogo: ", etapaCompleta);
console.log("Categoria: ", categoria);
console.log("Quantidade De Ingressos: ", quantidadeDeIngressos, "ingressos");
console.log("---Valores---");
console.log("Valor do ingresso: ", simbolo, valorIngresso);
console.log("Valor total: ", simbolo, valorTotal);

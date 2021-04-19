/* Reposta do exercícios de interpretação 
  exercício 1
    10
    10, 5

  exercício 2
    10, 10, 10
*/

// Reposta dos exercícios de escrita

// Exercício 1
let nome;
let idade;

console.log(typeof nome, typeof idade);
// Esses tipos foram impressos como undefined pois ainda não atribuímos nenhum valor

nome = prompt("Digite o seu nome:");
idade = prompt("Digite a sua idade:");

console.log(typeof nome, typeof idade);
// Esses tipos foram impressos como string pois a função prompt retorna uma string

console.log("Olá " + nome + ", você tem " + idade + " anos");

// Exercício 2
const cantorBandaFavorito = prompt("Qual é o seu cantor/banda favorita?");
const musicaFavorito = prompt("Qual é a sua música favorita?");
const almoco = prompt("O que você ira almoçar hoje?");
const programar = prompt("O que você acha da programação?");
const gosta = prompt("O que você gosta de fazer?");

console.log("1. Qual é o seu cantor/banda favorita?"); 
console.log("Reposta:", cantorBandaFavorito);
console.log("2. Qual é a sua música favorita?"); 
console.log("Reposta:", musicaFavorito);
console.log("3. O que você ira almoçar hoje?"); 
console.log("Reposta:", almoco);
console.log("4. O que você acha da programação?"); 
console.log("Reposta:", programar);
console.log("5. O que você gosta de fazer?"); 
console.log("Reposta:", gosta);

// Exercício 3
const comidasPreferidas = ["Pizza", "Macarrão", "Lasanha", "Almôndegas", "Batata Frita"];

console.log(comidasPreferidas);

console.log("Essas são as minhas comidas preferidas: ");
console.log("•", comidasPreferidas[0]);
console.log("•", comidasPreferidas[1]);
console.log("•", comidasPreferidas[2]);
console.log("•", comidasPreferidas[3]);
console.log("•", comidasPreferidas[4]);

comidasPreferidas[1] = prompt("Qual é a sua comida preferida?");

console.log(comidasPreferidas)

// Exercício 4
const perguntasRapidas = ["Você fez alguma atividade física hoje?", "Você bebeu água nas últimas 2h?", "Você estudou hoje?"];
const respostasRapidas = [true, false, true];

console.log(perguntasRapidas[0], respostasRapidas[0]);
console.log(perguntasRapidas[1], respostasRapidas[1]);
console.log(perguntasRapidas[2], respostasRapidas[2]);

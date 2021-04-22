/* Resolução dos exercícios de interpretação
  exercício 1)
    a.  false
    b.  false
    c.  true
    e.  boolean

  exercício 2)
    a.  undefined
    b.  null
    c.  11
    d.  3
    e.  [3, 19, 5, 6, 7, 8, 9, 10, 11, 12, 13]
    f.  9
*/

// Resolução dos exercícios de escrita

// Exercício 1
const idadeUsuario = Number(prompt("Qual é a sua idade?"));
const idadeMelhorAmigo = Number(prompt("Qual é a idade do seu melhor amigo?"));

console.log("Sua idade é maior do que a do seu melhor amigo?", 
  idadeUsuario > idadeMelhorAmigo);
console.log("Diferença de idades é:", idadeUsuario - idadeMelhorAmigo);

// Exercício 2
const numeroPar = Number(prompt("Digite um número par:"));
console.log("O resto da divisão por 2 é:", numeroPar % 2);
// O resto da divisão de um número par por 2 será sempre 0
// O resto da divisão de um número ímpar por 2 será sempre 1

// Exercício 3
const listaDeTarefas = [];

listaDeTarefas.push(prompt("A primeira tarefa que irá fazer hoje:"));
listaDeTarefas.push(prompt("A segunda tarefa que irá fazer hoje:"));
listaDeTarefas.push(prompt("A terceira tarefa que irá fazer hoje:"));

console.log(listaDeTarefas);

const index = Number(prompt("Digite a tarefa que quer remover(0, 1, 2) ):"));

listaDeTarefas.splice(index, 1);

console.log(listaDeTarefas);

// Exercício 4
const nomeDoUsuario = prompt("Qual é o seu nome?");
const emailDoUsuario = prompt("Digite o seu email:");

console.log(`O e-mail ${ emailDoUsuario } foi cadastrado com sucesso. Seja bem-vinda(o), ${ nomeDoUsuario }!`)

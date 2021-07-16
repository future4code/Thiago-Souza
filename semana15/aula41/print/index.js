//Reposta exercício 1a
// Para pegarmos os argumentos da execução de um progrma basta acessar a váraivel global process.argv, onde ele retorna o local da instalação do node, local que o programa está executando depois os argumentos do programas

function print(name, age) {
  console.log(`Olá, ${name}! Você tem ${age} anos. Em sete anos você terá ${Number(age) + 7}`);
}

function main() {
  if (process.argv.length !== 4)
    return console.log(`Eu preciso de 2 argumentos mas recebi ${process.argv.length - 2}.`);

  print(process.argv[2], process.argv[3]);
}

main();

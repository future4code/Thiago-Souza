function calcular(operação, valor1, valor2) {
  if (operação === "soma")
    return Number(valor1) + Number(valor2);

  if (operação === "sub")
    return Number(valor1) - Number(valor2);

  if (operação === "mult")
    return Number(valor1) * Number(valor2);

  if (operação === "div")
    return Number(valor1) / Number(valor2);

  return "Operação inválida";
}

function main() {
  if (process.argv.length !== 5)
    return console.log(`Eu preciso de 3 argumentos mas recebi ${process.argv.length - 2}.`);

  const resposta = calcular(process.argv[2], process.argv[3], process.argv[4]);
  console.log("Resposta:", resposta);
}

main();

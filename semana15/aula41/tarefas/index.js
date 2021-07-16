const files = require("fs");

function adicionarTarefa(tarefa) {
  const tarefas = JSON.parse(files.readFileSync("tarefas.json"));
  tarefas.push(tarefa);
  files.writeFileSync("tarefas.json", JSON.stringify(tarefas, null, "  "));
}

function main() {
  if (process.argv.length !== 3)
    return console.log(`Eu preciso de 1 argumento mas recebi ${process.argv.length - 2}.`);

  adicionarTarefa(process.argv[2]);
  console.log("\x1b[32mTarefa salva com sucesso, veja o arquivo tarefas.json\x1b[0m");
}

main();

function classificar(ano: number, sigla = "DC"): string {
  if (sigla !== "AC" && sigla !== "DC")
    return "Erro ao passar a sigla";

  if (ano < 0)
    return "Ano precisa ser positivo";

  if (sigla === "AC") {
    if (ano > 100000)
      return "Pré-história";

    return "Idade Antiga";
  }

  if (ano < 476)
    return "Idade Média";

  if (ano < 1453)
    return "Idade Moderna";

  return "Idade Contmporânea";
}

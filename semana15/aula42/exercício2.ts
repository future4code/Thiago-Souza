type Estatisticas = {
  maior: number;
  menor: number;
  media: number
}

type AmostraDeIdades = {
  numeros: number[];
  obterEstatisticas: (numeros: number[]) => Estatisticas;
}

function obterEstatisticas(numeros: number[]): Estatisticas {
  const numerosOrdenados = numeros.sort((numeroA, numeroB) => numeroA - numeroB);

  let soma = 0;

  for (const num of numeros)
    soma += num;

  const estatisticas: Estatisticas = {
    maior: numerosOrdenados[numeros.length - 1],
    menor: numerosOrdenados[0],
    media: soma / numeros.length
  };

  return estatisticas;
}

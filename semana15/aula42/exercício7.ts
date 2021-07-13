interface Produto {
  nome: string;
  preço: number;
  classificão: "verão" | "inverno" | "banho" | "íntimas";
}

interface ProdutoComDesconto extends Produto {
  preçoComDesconto: number;
}

const Descontos: {[key in Produto["classificão"]]: number} = {
  verão:   5,
  inverno: 10,
  banho:   4,
  íntimas: 7
};

function calcularDescontos(produtos: Produto[]): ProdutoComDesconto[] {
  return produtos.map((produto) => ({
    ...produto,
    preçoComDesconto: produto.preço * (100 - Descontos[produto.classificão]) / 100
  }));
}

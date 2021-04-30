//Exercício 1

function inverteArray( array ) {

  return array.reduce( ( result, current ) => [ current, ...result ], [] );

}

//Exercício 2

function retornaNumerosParesElevadosADois( array ) {

  return array.reduce( ( result, current ) => {

    if( current % 2 === 0 )
      result.push( current ** 2 );

    return result;

  }, [] );

}

//Exercício 3

function retornaNumerosPares( array ) {

  return array.filter( ( element ) => element % 2 === 0 );

}

//Exercício 4

function retornaMaiorNumero( array ) {

  return array.reduce( ( maior, current ) => {

    if( current > maior )
      return current;

    return maior;

  } );

}

//Exercício 5

function retornaQuantidadeElementos( array ) {

  return array.length;

}

//Exercício 6

function retornaExpressoesBooleanas() {

  return [
    false,
    false,
    true,
    true,
    true
  ];

}

//Exercício 7

function retornaNNumerosPares( limite ) {

  const pares = [];

  for( let indice = 0; indice < limite; indice++ )
    pares.push( indice * 2 );

  return pares;

}

//Exercício 8

function checaTriangulo( a, b, c ) {

  if( a === b  )
    if( a === c )
      return "Equilátero";
    else
      return "Isósceles";

  if( a === c || b === c )
    return "Isósceles";

  return "Escaleno";

}

//Exercício 9

function comparaDoisNumeros( num1, num2 ) {

  let maior, menor;

  if( num1 > num2 )
    [ maior, menor ] = [ num1, num2 ];
  else
    [ maior, menor ] = [ num2, num1 ];

  return {
    "maiorNumero":            maior,
    "maiorDivisivelporMenor": maior % menor === 0,
    "diferenca":              maior - menor
  };

  //Implemente sua lógica aqui

}

//Exercício 10

function segundoMaiorEMenor( array ) {

  //Implemente sua lógica aqui
}

//Exercício 11

function ordenaArray( array ) {

  //Implemente sua lógica aqui
}

//Exercício 12

function filmeFavorito() {

  //Implemente sua lógica aqui
}

//Exercício 13

function imprimeChamada() {

  //Implemente sua lógica aqui
}

//Exercício 14

function criaRetangulo( lado1, lado2 ) {

  //Implemente sua lógica aqui
}

//Exercício 15

function anonimizaPessoa( pessoa ) {

  //Implemente sua lógica aqui
}

//Exercício 16

const arrayDePessoas = [
  {
    "nome":  "Pedro",
    "idade": 20
  },
  {
    "nome":  "João",
    "idade": 10
  },
  {
    "nome":  "Paula",
    "idade": 12
  },
  {
    "nome":  "Artur",
    "idade": 89
  }
];

//Exercício 16, letra A

function maioresDe18( arrayDePessoas ) {

  //Implemente sua lógica aqui
}

//Exercício 16, letra B

function menoresDe18( arrayDePessoas ) {

  //Implemente sua lógica aqui
}

//Exercício 17, letra A

function multiplicaArrayPor2( array ) {

  //Implemente sua lógica aqui
}

//Exercício 17, letra B

function multiplicaArrayPor2S( array ) {

  //Implemente sua lógica aqui
}

//Exercício 17, letra C

function verificaParidade( array ) {

  //Implemente sua lógica aqui
}

//Exercício 18

const pessoas = [
  {
    "nome":   "Paula",
    "idade":  12,
    "altura": 1.8
  },
  {
    "nome":   "João",
    "idade":  20,
    "altura": 1.3
  },
  {
    "nome":   "Pedro",
    "idade":  15,
    "altura": 1.9
  },
  {
    "nome":   "Luciano",
    "idade":  22,
    "altura": 1.8
  },
  {
    "nome":   "Artur",
    "idade":  10,
    "altura": 1.2
  },
  {
    "nome":   "Soter",
    "idade":  70,
    "altura": 1.9
  }
];

//Exercício 18, letra A

function retornaPessoasAutorizadas() {

  //Implemente sua lógica aqui
}

//Exercício 18, letra B

function retornaPessoasNaoAutorizadas() {

  //Implemente sua lógica aqui
}

//Exercício 19

const consultasNome = [
  {
    "nome":           "João",
    "dataDaConsulta": "01/10/2021"
  },
  {
    "nome":           "Pedro",
    "dataDaConsulta": "02/07/2021"
  },
  {
    "nome":           "Paula",
    "dataDaConsulta": "03/11/2021"
  },
  {
    "nome":           "Márcia",
    "dataDaConsulta": "04/05/2021"
  }
];

//Exercício 19, letra A

function ordenaPorNome() {

}

//Exercício 19, letra B

const consultasData = [
  {
    "nome":           "João",
    "dataDaConsulta": "01/10/2021"
  },
  {
    "nome":           "Pedro",
    "dataDaConsulta": "02/07/2021"
  },
  {
    "nome":           "Paula",
    "dataDaConsulta": "03/11/2021"
  },
  {
    "nome":           "Márcia",
    "dataDaConsulta": "04/05/2021"
  }
];

function ordenaPorData() {

}

//Exercício 20

const contas = [
  {
    "cliente":    "João",
    "saldoTotal": 1000,
    "compras":    [
      100,
      200,
      300
    ]
  },
  {
    "cliente":    "Paula",
    "saldoTotal": 7500,
    "compras":    [ 200, 1040 ]
  },
  {
    "cliente":    "Pedro",
    "saldoTotal": 10000,
    "compras":    [
      5140,
      6100,
      100,
      2000
    ]
  },
  {
    "cliente":    "Luciano",
    "saldoTotal": 100,
    "compras":    [
      100,
      200,
      1700
    ]
  },
  {
    "cliente":    "Artur",
    "saldoTotal": 1800,
    "compras":    [ 200, 300 ]
  },
  {
    "cliente":    "Soter",
    "saldoTotal": 1200,
    "compras":    []
  }
];

function atualizaSaldo() {

  //Implemente sua lógica aqui
}

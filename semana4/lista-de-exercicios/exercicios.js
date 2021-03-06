/*eslint-disable @typescript-eslint/no-unused-vars, prefer-destructuring*/
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

function checaTriangulo( ladoA, ladoB, ladoC ) {

  if( ladoA === ladoB  )
    if( ladoA === ladoC )
      return "Equilátero";
    else
      return "Isósceles";

  if( ladoA === ladoC || ladoB === ladoC )
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

  let [ maior ] = array;
  let [ menor ] = array;

  const result = array.reduce( ( segundos, current ) => {

    if( segundos[ 0 ] === segundos[ 1 ] ) {

      if( menor < current )
        segundos[ 1 ] = current;

      if( maior > current )
        segundos[ 0 ] = current;

    } else if( current > maior ) {

      segundos[ 0 ] = maior;
      maior = current;

    } else if( current > segundos[ 0 ] ) {

      segundos[ 0 ] = current;

    } else if( current < menor ) {

      segundos[ 1 ] = menor;
      menor = current;

    } else if( current < segundos[ 1 ] ) {

      segundos[ 1 ] = current;

    }

    return segundos;

  }, [ maior, menor ] );

  return result;

}

//Exercício 11

function ordenaArray( array ) {

  const result = [ ...array ];

  for( let index = 0; index < result.length; index++ )
    for( let current = index; current >= 0; current-- )
      if( result[ current ] < result[ current - 1 ] ) {

        const swap = result[ current ];
        result[ current ] = result[ current - 1 ];
        result[ current - 1 ] = swap;

      }

  return result;

}

//Exercício 12

function filmeFavorito() {

  return {
    "nome":    "O Diabo Veste Prada",
    "ano":     2006,
    "diretor": "David Frankel",
    "atores":  [
      "Meryl Streep",
      "Anne Hathaway",
      "Emily Blunt",
      "Stanley Tucci"
    ]
  };

}

//Exercício 13

function imprimeChamada() {

  const filme = filmeFavorito();
  let atores = "";
  let index;
  for( index = 0; index < filme.atores.length - 1; index++ )
    atores += `${ filme.atores[ index ]  }, `;
  atores += filme.atores[ index ];
  /*eslint-disable-next-line max-len*/
  return `Venha assistir ao filme ${ filme.nome }, de ${ filme.ano }, dirigido por ${ filme.diretor } e estrelado por ${ atores }.`;

}

//Exercício 14

function criaRetangulo( lado1, lado2 ) {

  return {
    "largura":   lado1,
    "altura":    lado2,
    "perimetro": 2 * ( lado1 + lado2 ),
    "area":      lado1 * lado2
  };

}

//Exercício 15

function anonimizaPessoa( pessoa ) {

  return {
    ...pessoa,
    "nome": "ANÔNIMO"
  };

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

  return arrayDePessoas.filter( ( pessoa ) => pessoa.idade >= 18 );

}

//Exercício 16, letra B

function menoresDe18( arrayDePessoas ) {

  return arrayDePessoas.filter( ( pessoa ) => pessoa.idade <= 18 );

}

//Exercício 17, letra A

function multiplicaArrayPor2( array ) {

  return array.map( ( valor ) => valor * 2 );

}

//Exercício 17, letra B

function multiplicaArrayPor2S( array ) {

  return array.map( ( valor ) => String( valor * 2 ) );

}

//Exercício 17, letra C

function verificaParidade( array ) {

  return array.map( ( valor ) => {

    if( valor % 2 === 0 )
      return `${ valor } é par`;

    return `${ valor } é ímpar`;

  } );

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

  return pessoas.filter( ( pessoa ) => pessoa.altura > 1.5 &&
    pessoa.idade > 14 && pessoa.idade < 60 );

}

//Exercício 18, letra B

function retornaPessoasNaoAutorizadas() {

  return pessoas.filter( ( pessoa ) => !( pessoa.altura > 1.5 &&
    pessoa.idade > 14 && pessoa.idade < 60 ) );

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

  return consultasNome.sort( ( pessoaA, pessoaB ) => pessoaA.nome > pessoaB.nome );

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

  const result = consultasData.sort( ( pessoaA, pessoaB ) => {

    const [
      diaA,
      mesA,
      anoA
    ] = pessoaA.dataDaConsulta.split( "/" );
    const [
      diaB,
      mesB,
      anoB
    ] = pessoaB.dataDaConsulta.split( "/" );

    return new Date( anoA, mesA - 1, diaA ).getTime() -
           new Date( anoB, mesB - 1, diaB ).getTime();

  } );

  return result;

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

  return contas.map( ( cliente ) => {

    cliente.saldoTotal -= cliente.compras
      .reduce( ( total, compra ) =>  total += compra, 0 );

    return cliente;

  } );

}

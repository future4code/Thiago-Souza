const despesas = [];
imprimirDespesas( despesas );
imprimirExtrato();

function imprimirDespesas( despesas ) {

  const divDespesas = document.getElementById( "despesas" );
  divDespesas.innerHTML = "<p><u>Despesas Detalhadas</u></p>";

  divDespesas.innerHTML += despesas
    .sort( ( previus, next ) => previus.valor - next.valor )
    .reduce( ( final, despesa ) => final += `<p>
  valor: R$${ despesa.valor } | tipo: ${ despesa.tipo } | descrição: ${ despesa.descricao }
</p>`, "" );

}

function imprimirExtrato() {

  const divExtrato = document.getElementById( "extrato" );
  const {
    gastoTotal,
    gastoAlimentacao,
    gastoUtilidades,
    gastoViagem
  } = despesas.reduce( ( gasto, despesa ) => {

    gasto.gastoTotal += despesa.valor;

    if( despesa.tipo === "alimentação" )
      gasto.gastoAlimentacao += despesa.valor;
    else if( despesa.tipo === "utilidades" )
      gasto.gastoUtilidades += despesa.valor;
    else
      gasto.gastoViagem += despesa.valor;

    return gasto;

  }, {
    "gastoTotal":       0,
    "gastoAlimentacao": 0,
    "gastoUtilidades":  0,
    "gastoViagem":      0
  } );

  divExtrato.innerHTML = `<p>Extrato: Gasto Total: R$${ gastoTotal } | Alimentação: R$${ gastoAlimentacao } | 
                                        Utilidades: R$${ gastoUtilidades } | Viagem: R$${ gastoViagem }</p>`;

}

function limparFiltros() {

  document.getElementById( "tipoFiltro" ).value = "";
  document.getElementById( "valorFiltroMin" ).value = "";
  document.getElementById( "valorFiltroMax" ).value = "";

}

function adicionarDespesa() {

  const valorCdt = document.getElementById( "valorCadastro" );
  const tipoCtd = document.getElementById( "tipoCadastro" );
  const descricaoCtd = document.getElementById( "descricaoCadastro" );

  if( !validarValor( valorCdt ) || !validarTipo( tipoCtd ) ||
      !validarDescricao( descricaoCtd ) )
    return alert( "`Faltou algum valor ou algum valor é um número negativo`" );

  const novaDespesa = {
    "valor":     Number( valorCdt.value ),
    "tipo":      tipoCtd.value,
    "descricao": descricaoCtd.value
  };

  despesas.push( novaDespesa );

  valorCdt.value = "";
  tipoCtd.value = "";
  descricaoCtd.value = "";

  limparFiltros();
  imprimirDespesas( despesas );
  imprimirExtrato();

}

function filtrarDespesas() {

  const { "value": filtro } = document.getElementById( "tipoFiltro" );
  const valorMin = document.getElementById( "valorFiltroMin" );
  const valorMax = document.getElementById( "valorFiltroMax" );

  if( !validarTipo( filtro ) || !validarValor( valorMin ) ||
      !validarValor( valorMax ) ||
      Number( valorMin.value ) > Number( valorMax.value ) )
    return alert( "`Faltou algum valor ou algum valor é um número negativo`" );

  const min = Number( valorMin.value );
  const max = Number( valorMax.value );

  const despesasFiltradas = despesas
    .filter( ( despesa ) => ( filtro === "todos" || despesa.tipo === filtro ) &&
                              despesa.valor >= min && despesa.valor <= max );

  imprimirDespesas( despesasFiltradas );

}

function validarValor( valor ) {

  return valor.value.length > 0 && parseInt( valor.value ) > 0;

}

function validarTipo( tipo ) {

  return tipo.value !== "";

}

function validarDescricao( texto ) {

  return texto.value.replace( / /g, "" ).length !== 0;

}

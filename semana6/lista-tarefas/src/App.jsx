import React from "react";
import styled from "styled-components";
import "./styles.css";
import edit from "./img/edit.svg";

const TarefasContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const TarefaContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TarefaList = styled.ul`
  padding: 0;
  width: 200px;
  list-style-type: none;
`;

const Tarefa = styled.li`
  text-align: center;
  text-decoration: ${ ( { completa } ) =>  {

    if( completa )
      return "line-through";

    return "none";

  } };
`;

const Icon = styled.img`
  height: 20px;
  width: 20px;
  padding-left: 10px;
  margin-right: 10px;
  border-radius: 50%;
`;

const InputsContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 10px;
`;

class App extends React.Component {

  state = {
    "tarefas":     [],
    "inputTarefa": "",
    "filtro":      "",
    "inputEditar": "",
    "id":          "",
    "inputFiltro": "",
    "crescente":   true
  }

  componentDidUpdate() {

    localStorage.setItem( "tarefas", JSON.stringify( this.state.tarefas ) );

  }

  componentDidMount() {

    this.setState( { "tarefas": JSON.parse( localStorage.getItem( "tarefas" ) ) } );

  }

  onChangeInputTarefa = ( event ) => {

    this.setState( { "inputTarefa": event.target.value } );

  }

  onChangeInputEditar = ( event ) => {

    this.setState( { "inputEditar": event.target.value } );

  }

  onChangeInputFiltro = ( event ) => {

    this.setState( { "inputFiltro": event.target.value } );

  }

  criaTarefa = () => {

    const novaTarefa = {
      "id":       Date.now(),
      "texto":    this.state.inputTarefa,
      "completa": false
    };

    this.setState( {
      "tarefas":     [ ...this.state.tarefas, novaTarefa ],
      "inputTarefa": ""
    } );

  }

  selectTarefa = ( _id ) => {

    const tarefas = this.state.tarefas.map( ( tarefa ) => {

      if( tarefa.id === _id )
        tarefa.completa = !tarefa.completa;
      return tarefa;

    } );

    this.setState( { tarefas } );

  }

  onChangeFilter = ( event ) => {

    this.setState( { "filtro": event.target.value } );

  }

  deletarTarefa = ( _id ) => {

    const tarefas = this.state.tarefas.filter( ( tarefa ) => tarefa.id !== _id );
    this.setState( { tarefas } );

  }

  editarTarefaId = ( tarefa ) => {

    this.setState( {
      "id":          tarefa.id,
      "inputEditar": tarefa.texto
    } );

  }

  editarTarefa = () => {

    const tarefas = this.state.tarefas.map( ( tarefa ) => {

      if( tarefa.id === this.state.id )
        return {
          ...tarefa,
          "texto": this.state.inputEditar
        };

      return tarefa;

    } );

    this.setState( {
      tarefas,
      "id":          "",
      "inputEditar": ""
    } );

  }

  apagarTarefas = () => { this.setState( { "tarefas": [] } ); }

  tarefasCrescentes = () => { this.setState( { "crescente": true } ); }

  tarefasDecrescentes = () => { this.setState( { "crescente": false } ); }

  ordenar = ( tarefaA, tarefaB ) => {

    let nomeA = tarefaA.texto.toLowerCase();
    let nomeB = tarefaB.texto.toLowerCase();

    if( !this.state.crescente )
      [ nomeA, nomeB ] = [ nomeB, nomeA ];

    if( nomeA > nomeB )
      return 1;

    if( nomeA < nomeB )
      return -1;

    return 0;

  }

  /*eslint-disable-next-line max-lines-per-function*/
  render() {

    const tarefas = this.state.tarefas
      .filter( ( tarefa ) => tarefa.texto.match( this.state.inputFiltro ) )
      .sort( this.ordenar )
      .reduce( ( tarefas, tarefa ) => {

        if( tarefa.completa )
          return {
            ...tarefas,
            "completas": [ ...tarefas.completas, tarefa ]
          };

        return {
          ...tarefas,
          "pendentes": [ ...tarefas.pendentes, tarefa ]
        };

      }, {
        "completas": [],
        "pendentes": []
      } );

    return (
      < div className = "App" >
        < h1 >Lista de tarefas</ h1 >

        < h2 >Adicionar Tarefa</ h2 >
        < InputsContainer >
          < input
            value = { this.state.inputTarefa }
            onChange = { this.onChangeInputTarefa }
            placeholder = "Nome Da Tarefa"
          />
          < button onClick = { this.criaTarefa } >Adicionar</ button >
        </ InputsContainer >

        < h2 >Editar Tarefa</ h2 >
        < InputsContainer >
          < input
            value = { this.state.inputEditar }
            onChange = { this.onChangeInputEditar }
            disabled = { !this.state.id }
            placeholder = "Novo Nome"
          />
          < button onClick = { this.editarTarefa } disabled = { !this.state.id } >
            Editar
          </ button >
        </ InputsContainer >

        < h2 >Filtar Tarefas</ h2 >
        < InputsContainer >
          < input
            value = { this.state.inputFiltro }
            onChange = { this.onChangeInputFiltro }
            placeholder = "Filtrar Pelo Nome"
          />
          < label >Filtro</ label >
          < select value = { this.state.filter } onChange = { this.onChangeFilter } >
            < option value = "" >Nenhum</ option >
            < option value = "pendentes" >Pendentes</ option >
            < option value = "completas" >Completas</ option >
          </ select >
        </ InputsContainer >

        < h2 >Ordenar tarefas</ h2 >
        < InputsContainer >
          < button onClick = { this.tarefasCrescentes } >Crescente</ button >
          < button onClick = { this.tarefasDecrescentes } >Decrescente</ button >
        </ InputsContainer >

        < br />

        < button onClick = { this.apagarTarefas } >Apagar Todas Tarefas</ button >
        < TarefasContainer >
          < TarefaList >
            < h3 >Tarefas completas</ h3 >
            {
              tarefas.completas.map( ( tarefa ) => (
                < TarefaContainer key = { tarefa.id } >
                  < Tarefa
                    completa = { tarefa.completa }
                    onClick = { () => this.selectTarefa( tarefa.id ) }
                    onDoubleClick = { () => this.deletarTarefa( tarefa.id ) }
                  >
                    { tarefa.texto }
                  </ Tarefa >
                  < Icon
                    src = { edit }
                    alt = "Editar Tarefa"
                    onClick = { () => this.editarTarefaId( tarefa ) }
                  />
                </ TarefaContainer >
              ) )
            }
          </ TarefaList >
          < TarefaList >
            < h3 >Tarefas pendentes</ h3 >
            {
              tarefas.pendentes.map( ( tarefa ) => (
                < TarefaContainer key = { tarefa.id } >
                  < Tarefa
                    completa = { tarefa.completa }
                    onClick = { () => this.selectTarefa( tarefa.id ) }
                    onDoubleClick = { () => this.deletarTarefa( tarefa.id ) }
                  >
                    { tarefa.texto }
                  </ Tarefa >
                  < Icon
                    src = { edit }
                    alt = "Editar Tarefa"
                    onClick = { () => this.editarTarefaId( tarefa ) }
                  />
                </ TarefaContainer >
              ) )
            }
          </ TarefaList >
        </ TarefasContainer >
      </ div >
    );

  }

}

export default App;

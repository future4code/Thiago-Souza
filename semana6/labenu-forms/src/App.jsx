import React, { Component } from "react";
import styled from "styled-components";
import "./App.css";
import Etapa1 from "./components/Etapa1";
import Etapa2 from "./components/Etapa2";
import Etapa3 from "./components/Etapa3";
import Final from "./components/Final";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  margin: 10px;
`;

const etapaMaxima = 4;

const opcoesEscolaridade = [
  "Ensino médio incompleto",
  "Ensino médio completo",
  "Ensino superior incompleto",
  "Ensino superior completo"
];

class App extends Component {

  state = {
    "etapa":        1,
    "escolaridade": opcoesEscolaridade[ 0 ]
  }

  renderizaEtapa = () => {

    const { "state":{ etapa, escolaridade } } = this;

    if( etapa === 2 &&
        ( escolaridade === opcoesEscolaridade[ 0 ] ||
          escolaridade === opcoesEscolaridade[ 1 ] ) ||
        etapa === 3 &&
        ( escolaridade === opcoesEscolaridade[ 2 ] ||
          escolaridade === opcoesEscolaridade[ 3 ] )
    ) {

      this.setState( { "etapa": etapa + 1 } );
      return <></>;

    }

    switch ( this.state.etapa ) {

      case 1: return (
        < Etapa1
          onChange = { this.setEscolaridade }
          opcoesEscolaridade = { opcoesEscolaridade }
        />
      );
      case 2: return < Etapa2 />;
      case 3: return < Etapa3 />;
      case 4: return < Final />;
      default: return < Etapa1 />;

    }

  }

  irParaProximaEtapa = () => {

    const { "state": { etapa } } = this;
    this.setState( { "etapa": etapa >= 1 && etapa < etapaMaxima ? etapa + 1 : 1 } );

  }

  setEscolaridade = ( value ) => {

    this.setState( { "escolaridade": value } );

  }

  render() {

    return (
      < Main >
        { this.renderizaEtapa() }
        {
          this.state.etapa < etapaMaxima &&
            < Button onClick = { this.irParaProximaEtapa } >
              Próxima etapa
            </ Button >
        }
      </ Main >
    );

  }

}

export default App;

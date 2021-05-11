import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Label = styled.label`
  margin: 10px;
`;

const Select = styled.select`
  margin: 10px;
`;

export default class PerguntaFechada extends Component {

  state = { "value": this.props.opcoes[ 0 ] }

  onChange = ( event ) => {

    this.setState( { "value": event.target.value } );
    this.props.onChange && this.props.onChange( event.target.value );

  }

  render() {

    const opcoes = this.props.opcoes.map( ( opcoe ) => (
      < option key = { opcoe } value = { opcoe } >
        { opcoe }
      </ option >
    ) );

    return (
      <>
        < Label >{ this.props.pergunta }</ Label >
        < Select
          onChange = { this.onChange }
          value = { this.state.value }
        >
          { opcoes }
        </ Select >
      </>
    );

  }

}

PerguntaFechada.propTypes = {
  "pergunta": PropTypes.string.isRequired,
  "opcoes":   PropTypes.arrayOf( PropTypes.string ).isRequired,
  "onChange": PropTypes.func
};

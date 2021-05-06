import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const CommentContainer = styled.div`
    display: flex;
    justify-content: center;
    padding: 5px;
`;

const InputComentario = styled.input`
    width: 100%;
    margin-right: 5px;
`;

export class SecaoComentario extends Component {

  state = { "comentario": "" }

  onChangeComentario = ( event ) => {

    const { "target": { value } } = event;
    /*eslint-disable-next-line no-console*/
    console.log( value );
    this.setState( { "comentario": value } );

  }

  aoEnviar = () => {

    /*eslint-disable-next-line no-console*/
    console.log( `Comentário enviado: ${ this.state.comentario }` );
    this.setState( { "comentario": "" } );
    this.props.aoEnviar();

  }

  render() {

    return (
      < CommentContainer >
        < InputComentario
          placeholder = "Comentário"
          value = { this.state.comentario }
          onChange = { this.onChangeComentario }
        />
        < button onClick = { this.aoEnviar } >Enviar</ button >
      </ CommentContainer >
    );

  }

}

SecaoComentario.propTypes = { "aoEnviar": PropTypes.func.isRequired };

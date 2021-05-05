import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { IconImage } from "../IconeComContador/IconeComContador";

import iconeInstagram from "../../img/instagram.svg";
import iconeFacebook from "../../img/facebook.svg";
import iconeTwitter from "../../img/twitter.svg";

const ShareContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 5px;
`;

const IconContainer = styled.div`
    margin: 0 auto;
    width: 60%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
`;

const InputMensagem = styled.input`
    margin-right: 5px
`;

export class SecaoCompartilhar extends Component {

  state = { "mensagem": "" }

  onChangeMensagem = ( event ) => {

    const { "target": { value } } = event;
    this.setState( { "mensagem": value } );

  }

  compartilhar = ( redeSocial ) => {

    let { "state": { mensagem } } = this;

    if( mensagem )
      mensagem = ` com a mensagem: ${ mensagem }`;

    /*eslint-disable-next-line no-console*/
    console.log( `Post compartilhado no ${ redeSocial }${ mensagem }` );

    this.setState( { "mensagem": "" } );
    this.props.aoCompartilhar();

  }

  render() {

    return (
      < ShareContainer >
        < IconContainer >
          < IconImage
            alt = "Icone"
            src = { iconeInstagram }
            onClick = { () => this.compartilhar( "Instagram" ) }
          />
          < IconImage
            alt = "Icone"
            src = { iconeFacebook }
            onClick = { () => this.compartilhar( "Facebook" ) }
          />
          < IconImage
            alt = "Icone"
            src = { iconeTwitter }
            onClick = { () => this.compartilhar( "Twitter" ) }
          />
        </ IconContainer >
        < InputMensagem
          placeholder = "Comentário"
          value = { this.state.mensagem }
          onChange = { this.onChangeMensagem }
        />
      </ ShareContainer >
    );

  }

}

SecaoCompartilhar.propTypes = { "aoCompartilhar": PropTypes.func.isRequired };

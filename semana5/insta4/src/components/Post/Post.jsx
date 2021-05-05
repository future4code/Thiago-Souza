import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { IconeComContador, IconImage } from "../IconeComContador/IconeComContador";

import iconeCoracaoBranco from "../../img/favorite-white.svg";
import iconeCoracaoPreto from "../../img/favorite.svg";
import iconeBookmarkrPreto from "../../img/bookmark_black.svg";
import iconeBookmarkrBranco from "../../img/bookmark_white.svg";
import iconeComentario from "../../img/comment_icon.svg";
import iconeCompartilhar from "../../img/share.svg";
import { SecaoComentario } from "../SecaoComentario/SecaoComentario";
import { SecaoCompartilhar } from "../SecaoCompartilhar/SecaoCompartilhar";

const PostContainer = styled.div`
  border: 1px solid gray;
  width: 300px;
  margin-bottom: 10px;
`;

const PostHeader = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 10px;
`;

const PostFooter = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  justify-content: space-between;
`;

const UserPhoto = styled.img`
  height: 30px;
  width: 30px;
  margin-right: 10px;
  border-radius: 50%;
`;

const PostPhoto = styled.img`
  width: 100%;
`;

class Post extends React.Component {

  state = {
    "curtido":           false,
    "numeroCurtidas":    0,
    "comentando":        false,
    "numeroComentarios": 0,
    "postSalvo":         false,
    "compartilhando":    false
  }

  onClickCurtida = () => {

    const adicionarCurtida = this.state.curtido ? -1 : 1;

    this.setState( {
      "curtido":        !this.state.curtido,
      "numeroCurtidas": this.state.numeroCurtidas + adicionarCurtida
    } );

  }

  onClickSalvar = () => {

    this.setState( { "postSalvo": !this.state.postSalvo } );

  }

  onClickCompartilhar = () => {

    this.setState( {
      "compartilhando": !this.state.compartilhando,
      "comentando":     false
    } );

  }

  onClickComentario = () => {

    this.setState( {
      "comentando":     !this.state.comentando,
      "compartilhando": false
    } );

  }

  aoEnviarComentario = () => {

    this.setState( {
      "comentando":        false,
      "numeroComentarios": this.state.numeroComentarios + 1
    } );

  }

  aoCompartilhar = () => {

    this.setState( { "compartilhando": false } );

  }

  render() {

    const iconeCurtida = this.state
      .curtido ? iconeCoracaoPreto : iconeCoracaoBranco;

    const iconeSalvar = this.state
      .postSalvo ? iconeBookmarkrPreto : iconeBookmarkrBranco;

    const Comentario = this.state.comentando &&
      < SecaoComentario aoEnviar = { this.aoEnviarComentario } />;

    const Compartilhar = this.state.compartilhando &&
      < SecaoCompartilhar aoCompartilhar = { this.aoCompartilhar } />;

    return (
      < PostContainer >
        < PostHeader >
          < UserPhoto src = { this.props.fotoUsuario } alt = "Imagem do usuario" />
          < p >{ this.props.nomeUsuario }</ p >
        </ PostHeader >

        < PostPhoto src = { this.props.fotoPost } alt = "Imagem do post" />

        < PostFooter >
          < IconeComContador
            icone = { iconeCurtida }
            onClickIcone = { this.onClickCurtida }
            valorContador = { this.state.numeroCurtidas }
          />

          < IconImage
            alt = "Icone"
            src = { iconeSalvar }
            onClick = { this.onClickSalvar }
          />
          < IconImage
            alt = "Icone"
            src = { iconeCompartilhar }
            onClick = { this.onClickCompartilhar }
          />
          < IconeComContador
            icone = { iconeComentario }
            onClickIcone = { this.onClickComentario }
            valorContador = { this.state.numeroComentarios }
          />
        </ PostFooter >
        { Comentario }
        { Compartilhar }
      </ PostContainer >
    );

  }

}

Post.propTypes = {
  "nomeUsuario": PropTypes.string.isRequired,
  "fotoUsuario": PropTypes.string.isRequired,
  "fotoPost":    PropTypes.string.isRequired
};

export default Post;

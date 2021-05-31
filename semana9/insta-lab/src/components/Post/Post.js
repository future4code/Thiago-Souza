import React, { useState } from "react";
import {
  PostContainer, PostHeader, UserPhoto, PostPhoto, PostFooter, CommentContainer
} from "./styles";

import IconeComContador from "../IconeComContador/IconeComContador";
import SecaoComentario from "../SecaoComentario/SecaoComentario";
import íconeCoraçãoBranco from "../../img/favorite-white.svg";
import íconeCoraçãoPreto from "../../img/favorite.svg";
import íconeComentário from "../../img/comment_icon.svg";

const Post = (props) => {
  const [ curtido, setCurtido ] = useState(false);
  const [ númeroCurtidas, setNúmeroCurtidas ] = useState(0);
  const [ comentando, setComentando ] = useState(false);
  const [ númeroComentários, setNúmeroComentários ] = useState(0);
  const [ comentários, setComentários ] = useState([]);

  function onClickCurtida() {
    setCurtido(!curtido);
    setNúmeroCurtidas(númeroCurtidas - 1 * curtido  + 1 * !curtido);
  }

  function onClickComentário() {
    setComentando(!comentando);
  }

  function enviarComentário(comentário) {
    setComentários([ ...comentários, comentário ]);
    setComentando(false);
    setNúmeroComentários(númeroComentários + 1);
  }

  const caixaDeComentário = comentando
    ? <SecaoComentario enviarComentário={enviarComentário}/>
    : comentários.map((comentário) => (
      <CommentContainer key={comentário}>
        <p>{comentário}</p>
      </CommentContainer>
    ));

  return (
    <PostContainer>
      <PostHeader>
        <UserPhoto src={props.fotoUsuario} alt="Imagem do usuario"/>
        <p>{props.nomeUsuario}</p>
      </PostHeader>
      <PostPhoto src={props.fotoPost} alt="Imagem do post"/>
      <PostFooter>
        <IconeComContador
          icone={curtido ? íconeCoraçãoPreto : íconeCoraçãoBranco}
          onClickIcone={onClickCurtida}
          valorContador={númeroCurtidas}
        />
        <IconeComContador
          icone={íconeComentário}
          onClickIcone={onClickComentário}
          valorContador={númeroComentários}
        />
      </PostFooter>
      {caixaDeComentário}
    </PostContainer>
  );
};

export default Post;

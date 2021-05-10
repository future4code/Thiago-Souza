import React from "react";
import "./App.css";
import CardGrande from "./components/CardGrande/CardGrande";
import ImagemButton from "./components/ImagemButton/ImagemButton";

function App() {

  return (
    < div className = "App" >
      < div className = "page-section-container" >
        < h2 >Dados pessoais</ h2 >
        < CardGrande
          /*eslint-disable-next-line max-len*/
          imagem = "foto_eu.jpg"
          nome = "Thiago Felipe"
          /*eslint-disable-next-line max-len*/
          descricao = "Olá meu nome é Thiago Felipe, atualmento sou estudante de Engenharia Da Computação e Eletrônica na UFRJ e cursando na Labenu o curso Web Full Stack Developemnt"
        />

        < ImagemButton
          imagem = "https://image.flaticon.com/icons/png/512/117/117472.png"
          texto = "Ver mais"
        />
      </ div >

      < div className = "page-section-container" >
        < h2 >Experiências pessoais</ h2 >
        < CardGrande
          /*eslint-disable-next-line max-len*/
          imagem = "https://uploads-ssl.webflow.com/5d640f4558306be99cf47a0e/5dd57846babb597b77c6bb1d_PerfilFuture4_cor.png"
          nome = "Labenu"
          descricao = "Curso Web Full Stack - Cursando"
        />

        < CardGrande
          imagem = "ufrj_logo.jpeg"
          nome = "UFRJ"
          descricao = "Graduação De Engenharia Eletrônica E Da Computação - Cursando"
        />

        < CardGrande
          imagem = "ifmt_logo.png"
          nome = "IFMT"
          /*eslint-disable-next-line max-len*/
          descricao = "Ensino Médio Integrado a Curso Técnico de Informática - Finalizado"
        />
      </ div >

      < div className = "page-section-container" >
        < h2 >Minhas redes sociais</ h2 >
        < ImagemButton
          /*eslint-disable-next-line max-len*/
          imagem = "https://d2v9ipibika81v.cloudfront.net/uploads/sites/261/2017/01/facebook-logo-3.png"
          texto = "Facebook"
          alt = "Logo Facebook"
        />

        < ImagemButton
          /*eslint-disable-next-line max-len*/
          imagem = "https://logodownload.org/wp-content/uploads/2014/09/twitter-logo-1-1.png"
          texto = "Twitter"
          alt = "Logo Twitter"
        />
      </ div >
    </ div >
  );

}

export default App;

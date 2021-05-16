import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import PerguntaAberta from "./PerguntaAberta";
import PerguntaFechada from "./PerguntaFechada";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Etapa1( props ) {

  return (
    < Form >
      < h2 >ETAPA 1 - DADOS GERAIS</ h2 >
      < PerguntaAberta pergunta = "1. Qual o seu nome?" />
      < PerguntaAberta pergunta = "2. Qual sua idade?" />
      < PerguntaAberta pergunta = "3. Qual seu email?" />
      < PerguntaFechada
        pergunta = "4. Qual a sua escolaridade?"
        opcoes = { props.opcoesEscolaridade }
        onChange = { props.onChange }
      />
    </ Form >
  );

}

Etapa1.propTypes = {
  "onChange":           PropTypes.func.isRequired,
  "opcoesEscolaridade": PropTypes.arrayOf( PropTypes.string ).isRequired
};

export default Etapa1;

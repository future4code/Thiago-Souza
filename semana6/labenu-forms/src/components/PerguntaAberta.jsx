import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Label = styled.label`
  margin: 10px;
`;

const Input = styled.input`
  margin: 10px;
`;

export default function PerguntaAberta( props ) {

  return (
    <>
      < Label >{ props.pergunta }</ Label >
      < Input />
    </>
  );

}

PerguntaAberta.propTypes = { "pergunta": PropTypes.string.isRequired };

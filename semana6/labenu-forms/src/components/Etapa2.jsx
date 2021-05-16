import React from "react";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  margin: 10px;
`;

const Input = styled.input`
  margin: 10px;
`;

function Etapa2() {

  return (
    < Form >
      < h2 >ETAPA 2 - INFORMAÇÕES DO ENSINO SUPERIOR</ h2 >
      < Label >5. Qual curso?</ Label >
      < Input />
      < Label >6. Qual a unidade de ensino?</ Label >
      < Input />
    </ Form >
  );

}

export default Etapa2;

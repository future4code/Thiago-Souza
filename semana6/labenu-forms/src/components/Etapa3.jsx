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

const Select = styled.select`
  margin: 10px;
`;

function Etapa3() {

  return (
    < Form >
      < h2 >ETAPA 3 - INFORMAÇÕES GERAIS DE ENSINO</ h2 >
      < Label >5. Por que você não terminou um curso de graduação?</ Label >
      < Input />
      < label >6. Você fez algum curso complementar?</ label >
      < Select >
        < option value = "curso-tecnico" >Curso técnico</ option >
        < option value = "curso-de-ingles" >Curso de inglês</ option >
        < option value = "nada" >Não fiz curso complementar</ option >
      </ Select >
    </ Form >
  );

}

export default Etapa3;

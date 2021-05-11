import React from "react";
import styled from "styled-components";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Final() {

  return (
    < Div >
      < h2 >O FORMULÁRIO ACABOU</ h2 >
      < p >Muito obrigado por participar! Entraremos em contato!</ p >
    </ Div >
  );

}

export default Final;

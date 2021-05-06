import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const IconContainer = styled.div`
  display: flex;
`;
export const IconImage = styled.img`
  margin-right: 5px;
`;

export function IconeComContador( props ) {

  return (
    < IconContainer >
      < IconImage
        alt = "Icone"
        src = { props.icone }
        onClick = { props.onClickIcone }
      />
      < p >{ props.valorContador }</ p >
    </ IconContainer >
  );

}

IconeComContador.propTypes = {
  "icone":         PropTypes.string.isRequired,
  "onClickIcone":  PropTypes.func.isRequired,
  "valorContador": PropTypes.number.isRequired
};

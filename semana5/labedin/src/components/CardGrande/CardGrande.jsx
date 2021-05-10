import React from "react";
import "./CardGrande.css";
import PropTypes from "prop-types";

function CardGrande( props ) {

  return (
    < div className = "bigcard-container" >
      < img src = { props.imagem } alt = { props.alt } />
      < div >
        < h4 >{ props.nome }</ h4 >
        < p >{ props.descricao }</ p >
      </ div >
    </ div >
  );

}

CardGrande.propTypes = {
  "imagem":    PropTypes.string.isRequired,
  "alt":       PropTypes.string.isRequired,
  "nome":      PropTypes.string.isRequired,
  "descricao": PropTypes.string.isRequired
};

export default CardGrande;

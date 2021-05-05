import React from "react";
import "./ImagemButton.css";
import PropTypes from "prop-types";

function ImagemButton( props ) {

  return (
    < div className = "image-button-container" >
      < img src = { props.imagem } alt = { props.alt } />
      < p >{ props.texto }</ p >
    </ div >

  );

}

ImagemButton.propTypes = {
  "imagem": PropTypes.string.isRequired,
  "alt":    PropTypes.string.isRequired,
  "texto":  PropTypes.string.isRequired
};

export default ImagemButton;

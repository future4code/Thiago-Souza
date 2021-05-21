import React from "react";

function Header(props) {
  return (
    <header>
      <button onClick={props.irParaCriar} type="button">
        Criar Playlist
      </button>
      <button onClick={props.irParaLista} type="button">
        Ver As Playlist
      </button>
    </header>
  );
}

export default Header;

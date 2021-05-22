import React from "react";
import styled from "styled-components";

const HeaderStyle = styled.header`
  display: flex;
  justify-content: center;
`;

function Header(props) {
  return (
    <HeaderStyle>
      <button onClick={props.irParaCriar} type="button">
        Criar Playlist
      </button>
      <button onClick={props.irParaLista} type="button">
        Ver As Playlist
      </button>
    </HeaderStyle>
  );
}

export default Header;

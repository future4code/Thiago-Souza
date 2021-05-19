import styled, { css } from "styled-components";

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const Button = styled.button`
  cursor: pointer;
  transition: transform 200ms;

  &:active {
    transform: translateY(4px);
  }

  ${(props) => props.center && css`
    display: block;
    margin: 16px auto;
  `}
`;

export const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  text-align: center;
  padding: 16px;
  grid-gap: 16px;
  align-content: center;
  justify-content: center;

  button {
    width: fit-content;
    margin: 0 auto;
  }
`;

export const ListaDeUsuarios = styled.section`
  width: 100%;
  max-width: 250px;

  p {
    cursor: pointer;
  }
`;

export const UsuarioLista = styled.article`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: capitalize;
`;

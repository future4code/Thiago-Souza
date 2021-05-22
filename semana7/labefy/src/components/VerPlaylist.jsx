import React, { Component } from "react";
import styled from "styled-components";
import {
  adicionarMúsica, deletarPlaylist, listarMúsicas, removerMúsica
} from "../api";

import { MainStyled } from "./styled";

const Main = styled(MainStyled)`
  flex-direction: column;
  
  h1 {
    text-transform: capitalize;
  }
`;

const Buttons = styled.section`
  display: flex;
  justify-content: center;
`;

const Playlist = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  align-items: baseline;

  form {
    grid-row-start: 1;
    grid-column-start: 1;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
  }

  @media screen and (min-width: 800px) {
    grid-template-columns: 1fr 1fr;

    form {
      grid-column-start: 2;
      position: sticky;
      position: -webkit-sticky;
      top: 2em;
    }
  }
`;

const Música = styled.article`
  background-color: #ef843a;
  color: #FFFFFF;
  padding: 16px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 16px;
`;

const Nome = styled.p`
  font-weight: 700;
  font-size: 22px;
  margin: 0;
  text-transform: capitalize;
`;

const Artista = styled.p`
  text-transform: capitalize;
`;

class VerPlaylist extends Component {
  state = {
    músicas:    [],
    carregando: false,
    nome:       "",
    artista:    "",
    link:       ""
  }

  componentDidMount() {
    this.listarMúsicas();
  }

  listarMúsicas = async () => {
    try {
      this.setState({ carregando: true });
      this.setState({
        músicas:    (await listarMúsicas(this.props.id)).data.result.tracks,
        carregando: false
      });
    } catch (error) {
      alert(`Erro ao listar as músicas\nErro: ${JSON.stringify(error, null, 2)}`);
    } finally {
      this.setState({ carregando: false });
    }
  }

  removerPlaylist = async () => {
    const playlist = this.props.nome;

    if (!confirm(`Deseja realmente remover a playlist ${playlist} ?`))
      return;

    try {
      await deletarPlaylist(this.props.id);
      this.props.sairPlaylist();
      alert("Playlist removida com sucesso");
    } catch (error) {
      alert(`Erro ao remover a playlist\nErro: ${JSON.stringify(error, null, 2)}`);
    }
  }

  mudarInput = (nome, event) => {
    this.setState({ [nome]: event.target.value });
  }

  adicionarMúsica = async () => {
    if (!this.state.nome || !this.state.artista || !this.state.link)
      return alert("A música precisa de um nome, artista e link");

    const música = {
      name:   this.state.nome,
      artist: this.state.artista,
      url:    this.state.link
    };

    try {
      await adicionarMúsica(this.props.id, música);
      this.setState({
        nome:    "",
        artista: "",
        link:    ""
      });
      this.listarMúsicas();
      alert("Música adicionada com sucesso");
    } catch (error) {
      alert(`Erro ao adicionar a música\nErro: ${JSON.stringify(error, null, 2)}`);
    }
  }

  lidarTeclas = (event) => {
    if (event.key === "Enter")
      this.adicionarMúsica();
  }

  removerMúsica = async (id) => {
    const música = this.state.músicas.find((música) => música.id === id).name;

    if (!confirm(`Deseja realmente remover a música ${música}?`))
      return;

    try {
      await removerMúsica(this.props.id, id);
      this.listarMúsicas();
      alert("Música removida com sucesso");
    } catch (error) {
      alert(`Erro ao remover a música\nErro: ${JSON.stringify(error, null, 2)}`);
    }
  }

  render() {
    return (
      <Main>
        <h1>{`Playlist ${this.props.nome}`}</h1>
        <Buttons>
          <button onClick={this.props.sairPlaylist}>Sair</button>
          <button onClick={this.removerPlaylist}>Remover</button>
        </Buttons>
        <Playlist>
          <section>
            {this.state.músicas.map((música) => (
              <Música key={música.id}>
                <Nome>{música.name}</Nome>
                <Artista>{música.artist}</Artista>
                <audio controls>
                  <source src={música.url} type="audio/mpeg"/>
                </audio>
                <button
                  onClick={() => this.removerMúsica(música.id)}
                  type="button"
                >
                  Remover
                </button>
              </Música>
            ))}
            {!this.state.músicas.length
              && <h2>Playlist vazia, adicione uma música</h2>}
          </section>
          <form>
            <label>Nome Da Música</label>
            <input
              onChange={(event) => this.mudarInput("nome", event)}
              placeholder="Nome"
              value={this.state.nome}
              onKeyDown={this.lidarTeclas}
            />
            <label>Artista</label>
            <input
              onChange={(event) => this.mudarInput("artista", event)}
              placeholder="Artista/Banda"
              value={this.state.artista}
              onKeyDown={this.lidarTeclas}
            />
            <label>Link Da Música</label>
            <input
              onChange={(event) => this.mudarInput("link", event)}
              placeholder="URL"
              value={this.state.link}
              onKeyDown={this.lidarTeclas}
            />
            <button onClick={this.adicionarMúsica} type="button">
              Adicionar
            </button>
          </form>
        </Playlist>
      </Main>
    );
  }
}

export default VerPlaylist;


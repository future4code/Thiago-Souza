import React, { Component } from "react";
import styled from "styled-components";
import { criarPlaylist, listarPlaylists } from "../api";
import { MainStyled } from "./styled";

const Main = styled(MainStyled)`
  > h3 {
    display: block;
    text-align: center;
    width: 100%;
  }
`;

class CriarPlaylist extends Component {
  state = {
    nome:      "",
    playlists: [],
    criando:   false
  }

  componentDidMount() {
    this.listarPlaylists();
  }

  listarPlaylists = async () => {
    try {
      this.setState({ playlists: (await listarPlaylists()).data.result.list });
    } catch (error) {
      alert(`Erro ao listar a playlist\nErro: ${JSON.stringify(error, null, 2)}`);
    }
  }

  mudarNome = (event) => { this.setState({ nome: event.target.value }); }

  criarPlaylist = async () => {
    const nome = this.state.nome.toLowerCase();
    if (this.state.playlists.find((playlist) => playlist.name === nome))
      return alert("Nome da playlist já existe");

    if (!this.state.nome)
      return alert("A playlist precisa de um nome");

    try {
      this.setState({ criando: true });

      await criarPlaylist(nome);

      this.setState({ nome: "" });
      this.listarPlaylists();
      alert("Playlist criada com sucesso");
    } catch (error) {
      alert(`Erro ao criar a playlist\nErro: ${JSON.stringify(error, null, 2)}`);
    } finally {
      this.setState({ criando: false });
    }
  }

  changeKey = (event) => {
    if (event.key === "Enter")
      this.criarPlaylist();
  }

  render() {
    return (
      <Main>
        <input
          value={this.state.nome}
          onChange={this.mudarNome}
          placeholder="Nome Da Playlist"
          onKeyDown={this.changeKey}
        />
        <button onClick={this.criarPlaylist} type="button">Criar</button>
        {this.state.criando && <h3>Criando Playlist</h3>}
      </Main>
    );
  }
}

export default CriarPlaylist;

import React, { Component } from "react";
import styled from "styled-components";
import { deletarPlaylist, listarMúsicas } from "../api";

const Main = styled.main``;

class VerPlaylist extends Component {
  state = {
    músicas:    [],
    carregando: false
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

  render() {
    return (
      <Main>
        <h2>{this.state.nome}</h2>
        <button onClick={this.props.sairPlaylist}>Sair</button>
        <p>{this.props.nome}</p>
        <pre>{JSON.stringify(this.state.músicas, null, 2)}</pre>
        <button onClick={this.removerPlaylist}>Remover</button>
      </Main>
    );
  }
}

export default VerPlaylist;


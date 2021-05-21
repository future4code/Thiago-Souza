import React, { Component } from "react";
import styled from "styled-components";
import { deletarPlaylist, listarPlaylists } from "../api";
import VerPlaylist from "./VerPlaylist";

const Main = styled.main``;

class ListarPlaylists extends Component {
  state = {
    nome:         "",
    playlists:    [],
    carregando:   false,
    playlistId:   "",
    playlistNome: ""
  }

  componentDidMount() {
    this.listarPlaylists();
  }

  listarPlaylists = async () => {
    try {
      this.setState({ carregando: true });
      this.setState({
        playlists:  (await listarPlaylists()).data.result.list,
        carregando: false
      });
    } catch (error) {
      alert(`Erro ao listar a playlist\nErro: ${JSON.stringify(error, null, 2)}`);
    } finally {
      this.setState({ carregando: false });
    }
  }

  removerPlaylist = async (id) => {
    const playlist = this.state.playlists.find((play) => play.id === id).name;

    if (!confirm(`Deseja realmente remover a playlist ${playlist} ?`))
      return;

    try {
      await deletarPlaylist(id);
      this.listarPlaylists();
      alert("Playlist removida com sucesso");
    } catch (error) {
      alert(`Erro ao remover a playlist\nErro: ${JSON.stringify(error, null, 2)}`);
    }
  }

  verPlaylist = (playlistId, playlistNome) => {
    this.setState({
      playlistId,
      playlistNome
    });
  }

  sairPlaylist = () => {
    this.setState({
      playlistId:   "",
      playlistNome: ""
    });
    this.listarPlaylists();
  }

  render() {
    if (this.state.playlistId)
      return (
        <VerPlaylist
          id={this.state.playlistId}
          nome={this.state.playlistNome}
          sairPlaylist={this.sairPlaylist}
        />
      );

    return (
      <Main>
        {this.state.carregando && <h3>Carregando As PLaylists</h3>}
        <section>
          {this.state.playlists.map((playlist) => (
            <article key={playlist.id}>
              <p onClick={() => this.verPlaylist(playlist.id, playlist.name)}>
                {playlist.name}
              </p>
              <button onClick={() => this.removerPlaylist(playlist.id)}>
                Remover
              </button>
            </article>
          ))}
        </section>
      </Main>
    );
  }
}

export default ListarPlaylists;


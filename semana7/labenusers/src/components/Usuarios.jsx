import axios from "axios";
import React, { Component } from "react";
import Usuario from "./Usuario";

const BASE_URL
= "https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users";

const headers = { Authorization: "thiago-felipe-paiva" };

class Usuarios extends Component {
  state = {
    usuarios:  [],
    detalheId: "",
    buscar:    ""
  }

  componentDidMount() {
    this.listarUsurios();
  }

  listarUsurios = () => {
    axios.get(BASE_URL, { headers })
      .then((resposta) => {
        this.setState({ usuarios: resposta.data });
      })
      .catch((error) => {
        alert(`Erro ao listar os usuários\nErro: ${JSON.stringify(error, null, 2)}`);
      });
  }

  removerUsuario = (id) => {
    if (!confirm("Tem certeza de que deseja deletar?"))
      return;

    axios.delete(`${BASE_URL}/${id}`, { headers })
      .then(() => {
        alert("Usuário removido com sucesso.");
        this.listarUsurios();
        this.mostrarLista();
      })
      .catch((error) => {
        alert(`Erro ao remover o usuário\nErro: ${JSON.stringify(error, null, 2)}`);
      });
  }

  mostrarUsuario = (detalheId) => {
    this.setState({ detalheId });
  }

  mostrarLista = () => {
    this.listarUsurios();
    this.setState({ detalheId: "" });
  }

  mudarInput = (evento, input) => {
    this.setState({ [input]: evento.target.value });
  }

  buscar = () => {
    axios.get(`${BASE_URL}/search?name=${this.state.buscar}`, { headers })
      .then((resposta) => {
        this.setState({ usuarios: resposta.data });
      })
      .catch((error) => {
        alert(`Erro ao buscar os usuários\nErro: ${JSON.stringify(error, null, 2)}`);
      });
  }

  render() {
    const usuarios = this.state.usuarios.map((usuario) => (
      <li key={usuario.id}>
        <p onClick={() => this.mostrarUsuario(usuario.id)}>{usuario.name}</p>
        <button onClick={() => this.removerUsuario(usuario.id)}>
          Remover
        </button>
      </li>
    ));

    if (this.state.detalheId)
      return (
        <Usuario
          id={this.state.detalheId}
          mostrarLista={this.mostrarLista}
          removerUsuario={this.removerUsuario}
        />
      );

    return (
      <main>
        <h1>Labenusers</h1>
        <button onClick={this.props.irParaCadatro}>
          Ir Para Cadastro
        </button>
        <label htmlFor="procurar">Buscar Usuário</label>
        <input
          type="text"
          onChange={(evento) => this.mudarInput(evento, "buscar")}
          value={this.state.procurar}
          placeholder="Nome"
          name="buscar"
          id="buscar"
          required
        />
        <button type="button" onClick={this.buscar}>
          Buscar
        </button>
        <ul>{usuarios}</ul>
      </main>
    );
  }
}

export default Usuarios;

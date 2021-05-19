import axios from "axios";
import React, { Component } from "react";

const BASE_URL
  = "https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users";

const headers = { Authorization: "thiago-felipe-paiva" };

class Usuario extends Component {
  state = {
    usuario: {
      name:  "",
      email: "",
      id:    ""
    },
    inputNome:  "",
    inputEmail: "",
    editar:     false
  }

  componentDidMount() {
    this.pegarUsuario();
  }

  pegarUsuario = () => {
    const id = this.props.id;
    axios.get(`${BASE_URL}/${id}`, { headers })
      .then((resposta) => {
        this.setState({
          usuario:    resposta.data,
          inputNome:  resposta.data.name,
          inputEmail: resposta.data.email
        });
      })
      .catch((error) => {
        alert(`Erro ao pegar o usuário\nErro: ${error}`);
      });
  }

  removerUsuario = () => {
    this.props.removerUsuario(this.state.usuario.id);
  }

  mudarInput = (evento, input) => {
    this.setState({ [input]: evento.target.value });
  }

  alterarUsuario = () => {
    const id = this.props.id;
    const usuario = {
      name:  this.state.inputNome,
      email: this.state.inputEmail
    };

    axios.put(`${BASE_URL}/${id}`, usuario, { headers })
      .then(() => {
        this.pegarUsuario();
        this.setState({ editar: false });
        alert("Informações do usuário foram alterdas com sucesso.");
      })
      .catch((error) => {
        alert(`Erro ao editar o usuário\nErro: ${error}`);
      });
  }

  render() {
    let editar;

    if (this.state.editar)
      editar = (
        <form>
          <label htmlFor="nome">Nome Do Usuário</label>
          <input
            type="text"
            onChange={(evento) => this.mudarInput(evento, "inputNome")}
            value={this.state.inputNome}
            placeholder="Nome"
            name="nome"
            id="nome"
            required
          />
          <label htmlFor="email">E-mail Do Usuário</label>
          <input
            type="text"
            onChange={(evento) => this.mudarInput(evento, "inputEmail")}
            value={this.state.inputEmail}
            placeholder="E-mail"
            name="email"
            id="email"
            required
          />
          <button type="button" onClick={this.alterarUsuario}>
            Salvar
          </button>
        </form>
      );

    else
      editar = (
        <button onClick={() => this.setState({ editar: true })}>
          Editar
        </button>
      );

    return (
      <main>
        <h1>Labenusers</h1>
        <button onClick={this.props.mostrarLista}>
          Ir Para Lista De Usuários
        </button>
        <article>
          <p>{`Nome: ${this.state.usuario.name}`}</p>
          <p>{`Email: ${this.state.usuario.email}`}</p>
          <button onClick={this.removerUsuario}>Remover</button>
          {editar}
        </article>
      </main>
    );
  }
}

export default Usuario;

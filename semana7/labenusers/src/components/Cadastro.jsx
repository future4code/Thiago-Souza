import React, { Component } from "react";
import axios from "axios";

class Cadastro extends Component {
  state = {
    nome:  "",
    email: ""
  }

  mudarInput = (evento, input) => {
    this.setState({ [input]: evento.target.value });
  }

  criarUsuario = () => {
    const usuario = {
      name:  this.state.nome,
      email: this.state.email
    };

    const url
      = "https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users";

    const headers = { Authorization: "thiago-felipe-paiva" };

    axios.post(url, usuario, { headers })
      .then(() => {
        alert("Usuário criado com sucesso");
        this.setState({
          nome:  "",
          email: ""
        });
      })
      .catch((error) => {
        alert(`Erro ao criar o usuário\nErro: ${JSON.stringify(error, null, 2)}`);
      });
  }

  render() {
    return (
      <main>
        <h1>Labenusers</h1>
        <button onClick={this.props.irParaUsuarios}>
          Ir Para Lista De Usuários
        </button>
        <form>
          <label htmlFor="nome">Nome Do Usuário</label>
          <input
            type="text"
            onChange={(evento) => this.mudarInput(evento, "nome")}
            value={this.state.nome}
            placeholder="Nome"
            name="nome"
            id="nome"
            required
          />
          <label htmlFor="email">E-mail Do Usuário</label>
          <input
            type="text"
            onChange={(evento) => this.mudarInput(evento, "email")}
            value={this.state.email}
            placeholder="E-mail"
            name="email"
            id="email"
            required
          />
          <button type="button" onClick={this.criarUsuario}>
            Criar
          </button>
        </form>
      </main>
    );
  }
}

export default Cadastro;

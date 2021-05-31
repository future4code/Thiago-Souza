import React, { Component } from "react";
import { criarUsuario } from "../api";
import { Button, Form, Main } from "../styles/basics";

class Cadastro extends Component {
  state = {
    nome:  "",
    email: ""
  }

  mudarInput = (evento, input) => {
    this.setState({ [input]: evento.target.value });
  }

  criarUsuario = async () => {
    const usuario = {
      name:  this.state.nome,
      email: this.state.email
    };

    try {
      await criarUsuario(usuario);
      alert("Usuário criado com sucesso");
      this.setState({
        nome:  "",
        email: ""
      });
    } catch (error) {
      alert(`Erro ao criar o usuário\nErro: ${JSON.stringify(error, null, 2)}`);
    }
  }

  render() {
    return (
      <Main>
        <h1>Labenusers</h1>
        <Button onClick={this.props.irParaUsuarios}>
          Ir Para Lista De Usuários
        </Button>
        <Form>
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
          <Button type="Button" onClick={this.criarUsuario}>
            Criar
          </Button>
        </Form>
      </Main>
    );
  }
}

export default Cadastro;

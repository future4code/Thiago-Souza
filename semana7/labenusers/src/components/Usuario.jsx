import React, { Component } from "react";
import { pegarUsuario, alterarUsuario } from "../api";
import { Button, Form, Main } from "../styles/basics";

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

  pegarUsuario = async () => {
    const id = this.props.id;
    try {
      const usuario = (await pegarUsuario(id)).data;
      this.setState({
        usuario,
        inputNome:  usuario.name,
        inputEmail: usuario.email
      });
    } catch (error) {
      alert(`Erro ao pegar o usuário\nErro: ${error}`);
    }
  }

  removerUsuario = () => {
    this.props.removerUsuario(this.state.usuario.id);
  }

  mudarInput = (evento, input) => {
    this.setState({ [input]: evento.target.value });
  }

  alterarUsuario = async () => {
    const usuario = {
      name:  this.state.inputNome,
      email: this.state.inputEmail
    };

    try {
      await alterarUsuario(this.props.id, usuario);
      this.pegarUsuario();
      this.setState({ editar: false });
      alert("Informações do usuário foram alterdas com sucesso.");
    } catch (error) {
      alert(`Erro ao editar o usuário\nErro: ${error}`);
    }
  }

  render() {
    let editar;

    if (this.state.editar)
      editar = (
        <Form>
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
          <Button type="Button" onClick={this.alterarUsuario}>
            Salvar
          </Button>
        </Form>
      );

    else
      editar = (
        <Button center onClick={() => this.setState({ editar: true })}>
          Editar
        </Button>
      );

    return (
      <Main>
        <h1>Labenusers</h1>
        <Button onClick={this.props.mostrarLista}>
          Ir Para Lista De Usuários
        </Button>
        <article>
          <p>{`Nome: ${this.state.usuario.name}`}</p>
          <p>{`Email: ${this.state.usuario.email}`}</p>
          <Button center onClick={this.removerUsuario}>Remover</Button>
          {editar}
        </article>
      </Main>
    );
  }
}

export default Usuario;

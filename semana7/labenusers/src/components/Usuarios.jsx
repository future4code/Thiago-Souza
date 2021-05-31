import React, { Component } from "react";
import { buscarNome, listarUsurios, removerUsuario } from "../api";
import {
  Button,
  Form,
  ListaDeUsuarios,
  Main,
  UsuarioLista
} from "../styles/basics";
import Usuario from "./Usuario";

class Usuarios extends Component {
  state = {
    usuarios:  [],
    detalheId: "",
    buscar:    ""
  }

  componentDidMount() {
    this.listarUsurios();
  }

  listarUsurios = async () => {
    try {
      this.setState({ usuarios: (await listarUsurios()).data });
    } catch (error) {
      alert(`Erro ao listar os usuários\nErro: ${JSON.stringify(error, null, 2)}`);
    }
  }

  removerUsuario = async (id) => {
    if (!confirm("Tem certeza de que deseja deletar?"))
      return;

    try {
      await removerUsuario(id);
      alert("Usuário removido com sucesso.");
      this.listarUsurios();
      this.mostrarLista();
    } catch (error) {
      alert(`Erro ao remover o usuário\nErro: ${JSON.stringify(error, null, 2)}`);
    }
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

  buscar = async () => {
    try {
      this.setState({ usuarios: (await buscarNome(this.state.buscar)).data });
      this.setState({ buscar: "" });
    } catch (error) {
      alert(`Erro ao buscar os usuários\nErro: ${JSON.stringify(error, null, 2)}`);
    }
  }

  render() {
    const usuarios = this.state.usuarios.map((usuario) => (
      <UsuarioLista key={usuario.id}>
        <p onClick={() => this.mostrarUsuario(usuario.id)}>{usuario.name}</p>
        <Button onClick={() => this.removerUsuario(usuario.id)}>
          Remover
        </Button>
      </UsuarioLista>
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
      <Main>
        <h1>Labenusers</h1>
        <Button onClick={this.props.irParaCadatro}>
          Ir Para Cadastro
        </Button>
        <Form>
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
          <Button type="Button" onClick={this.buscar}>
            Buscar
          </Button>
        </Form>
        <ListaDeUsuarios>{usuarios}</ListaDeUsuarios>
      </Main>
    );
  }
}

export default Usuarios;

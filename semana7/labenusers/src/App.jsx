import React, { Component } from "react";
import Cadastro from "./components/Cadastro";
import Usuarios from "./components/Usuarios";
import "./App.css";

class App extends Component {
  state = { pagina: "cadastro" }

  irParaCadatro = () => { this.setState({ pagina: "cadastro" }); }

  irParaUsuarios = () => { this.setState({ pagina: "usuarios" }); }

  render() {
    const pagina = this.state.pagina === "cadastro"
      ? <Cadastro irParaUsuarios={this.irParaUsuarios}/>
      : <Usuarios irParaCadatro={this.irParaCadatro}/>;

    return pagina;
  }
}

export default App;

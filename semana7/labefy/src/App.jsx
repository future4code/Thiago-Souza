import React, { Component } from "react";
import CriarPlaylist from "./components/CriarPlaylist";
import Header from "./components/Header";
import ListarPlaylists from "./components/ListarPlaylists";

class App extends Component {
  state = { pagína: "criar" }

  irParaCriar = () => { this.setState({ pagína: "criar" }); }

  irParaLista = () => { this.setState({ pagína: "lista" }); }

  main = () => {
    const { pagína } = this.state;

    if (pagína === "criar")
      return <CriarPlaylist/>;

    if (pagína === "lista")
      return <ListarPlaylists/>;

    return <CriarPlaylist/>;
  }

  render() {
    return (
      <>
        <Header irParaLista={this.irParaLista} irParaCriar={this.irParaCriar}/>
        {this.main()}
      </>
    );
  }
}

export default App;

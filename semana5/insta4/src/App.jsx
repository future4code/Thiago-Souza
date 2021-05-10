import React from "react";
import styled from "styled-components";
import Post from "./components/Post/Post";

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  margin: 10px;
`;

const Input = styled.input`
  margin-left: 5px;
  margin-right: 5px;
`;

const Button = styled.button`
  margin-left: 5px;
  margin-right: 5px;
`;

class App extends React.Component {

  state = {
    "inputNome":        "",
    "inputFotoUsuario": "",
    "inputFotoPost":    "",
    "posts":            [
      {
        "nome":        "paulinha",
        "fotoUsuario": "https://picsum.photos/50/50",
        "fotoPost":    "https://picsum.photos/200/150"
      },
      {
        "nome":        "thiago",
        "fotoUsuario": "https://picsum.photos/50/51",
        "fotoPost":    "https://picsum.photos/200/151"
      },
      {
        "nome":        "felipe",
        "fotoUsuario": "https://picsum.photos/50/52",
        "fotoPost":    "https://picsum.photos/200/152"
      }
    ]
  }

  onChange = ( event, target ) => {

    this.setState( { [ target ]: event.target.value } );

  }

  postar = () => {

    const post = {
      "nome":        this.state.inputNome,
      "fotoUsuario": this.state.inputFotoUsuario,
      "fotoPost":    this.state.inputFotoPost
    };

    this.setState( {
      "inputNome":        "",
      "inputFotoUsuario": "",
      "inputFotoPost":    "",
      "posts":            [ post, ...this.state.posts ]
    } );

  }

  render() {

    document.title = "Insta4";

    const Posts = this.state.posts.map( ( pessoa ) => (
      < Post
        key = { pessoa.nome }
        nomeUsuario = { pessoa.nome }
        fotoUsuario = { pessoa.fotoUsuario }
        fotoPost = { pessoa.fotoPost }
      />
    ) );

    return (
      < MainContainer >
        < Form >
          < Input
            placeholder = "Nome"
            onChange = { ( event ) => this.onChange( event, "inputNome" ) }
            value = { this.state.inputNome }
          />
          < Input
            placeholder = "Foto Do Usuario"
            onChange = { ( event ) => this.onChange( event, "inputFotoUsuario" ) }
            value = { this.state.inputFotoUsuario }
          />
          < Input
            placeholder = "Foto Do Post"
            onChange = { ( event ) => this.onChange( event, "inputFotoPost" ) }
            value = { this.state.inputFotoPost }
          />
          < Button type = "button" onClick = { this.postar } >Postar</ Button >
        </ Form >
        { Posts }
      </ MainContainer >
    );

  }

}

export default App;

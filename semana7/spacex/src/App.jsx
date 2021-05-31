import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";

const BASE_URL = "https://api.spacexdata.com/v3/launches";

const Title = styled.h1`
  text-align: center;
`;

const Cards = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Card = styled.article`
  text-align: center;
  border: 1px solid black;
  border-radius: 16px;
  width: fit-content;
  padding: 16px;
  margin: 16px;
`;

class App extends Component {
  state = { lançamentos: [] }

  componentDidMount() {
    this.listarLançamentos();
  }

  listarLançamentos = async () => {
    try {
      const lançamentos = (await axios.get(BASE_URL)).data
        .sort((aaa, bbb) => bbb.launch_date_unix - aaa.launch_date_unix)
        .map((lançamento) => ({
          nome:    lançamento.mission_name,
          número:  lançamento.flight_number,
          data:    lançamento.launch_date_utc,
          sucesso: lançamento.launch_success,
          foguete:
          `${lançamento.rocket.rocket_name} / ${lançamento.rocket.rocket_type}`,
          lançamento
        }));

      this.setState({ lançamentos });
    } catch (error) {
      alert(`Erro ao pegar os lançamentos\nErro: ${error}`);
    }
  }

  render() {
    const lançamentos = this.state.lançamentos.map((lançamento) => {
      let sucesso;
      if (lançamento.sucesso)
        sucesso = "Sim";
      else
      if (lançamento.sucesso === null)
        sucesso = "Ainda Não Lançado";
      else
        sucesso = "Não";

      return (
        <Card key={lançamento.nome + lançamento.número}>
          <h3>Número Da Missão</h3>
          <p>{lançamento.número}</p>
          <h3>Nome Da Missão</h3>
          <p>{lançamento.nome}</p>
          <h3>Foguete / Tipo</h3>
          <p>{lançamento.foguete}</p>
          <h3>Data De Lançamento(UTC)</h3>
          <p>{lançamento.data}</p>
          <h3>Sucesso</h3>
          <p>{sucesso}</p>
        </Card>
      );
    });

    return (
      <main>
        <Title>Lista De Lançamentos De Foguetes Da SpaceX</Title>
        <Cards>{lançamentos}</Cards>
      </main>
    );
  }
}

export default App;

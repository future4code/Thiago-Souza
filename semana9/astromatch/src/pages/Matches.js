import React, { useEffect, useState } from "react";
import { clearMatchesAndProfilesViewed, getMatches } from "../api";
import ButtonsForCleanMatches from "../components/ButtonsForCleanMatches";
import Header from "../components/Header";
import Loading from "../components/Loading";
import MatchesList from "../components/MatchesList";

export default function Matches(props) {
  const [ loading, setLoading ] = useState(true);
  const [ matches, setMatches ] = useState([]);

  async function getProfiles() {
    setLoading(true);
    try {
      setMatches((await getMatches()).data.matches);
    } catch (error) {
      alert(`Erro ao pegar os matches\nErro: ${JSON.stringify(error)}`);
    }
    setLoading(false);
  }

  async function cleanMatches() {
    setLoading(true);
    try {
      await clearMatchesAndProfilesViewed();
    } catch (error) {
      alert(`Erro ao apagar os matches\nErro: ${JSON.stringify(error)}`);
    }
    await getProfiles();
    setLoading(false);
  }

  useEffect(() => { getProfiles(); }, []);

  return (
    <main>
      <Header type="matches" onClick={props.goToHome}/>
      {loading
        ? <Loading message="Procurando seus matches"/>
        : <MatchesList matches={matches}/> }
      <ButtonsForCleanMatches cleanMatches={cleanMatches}/>
    </main>
  );
}

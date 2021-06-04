import React, { useEffect, useState } from "react";
import { clearMatchesAndProfilesViewed, getMatches } from "../api";
import ButtonsForCleanMatches from "../components/ButtonsForCleanMatches";
import IconHome from "../components/Icons/Home";
import Loading from "../components/Loading";
import Logo from "../components/Logo";
import MatchesList from "../components/MatchesList";

export default function Matches(props) {
  const [ loading, setLoading ] = useState(true);
  const [ matches, setMatches ] = useState([]);

  async function getProfiles() {
    setLoading(true);
    setMatches((await getMatches()).data.matches);
    setLoading(false);
  }

  async function cleanMatches() {
    setLoading(true);
    await clearMatchesAndProfilesViewed();
    await getProfiles();
    setLoading(false);
  }

  useEffect(() => { getProfiles(); }, []);

  return (
    <main>
      <header className="start">
        <Logo/>
        <IconHome className="green" onClick={props.gotToHome}/>
      </header>
      {loading
        ? <Loading message="Procurando seus matches"/>
        : <MatchesList matches={matches}/> }
      <ButtonsForCleanMatches cleanMatches={cleanMatches}/>
    </main>
  );
}

import React, { useEffect, useState } from "react";
import { choosePerson, getProfileToChoose } from "../api";
import IconMatches from "../components/Icons/Matches";
import Loading from "../components/Loading";
import Logo from "../components/Logo";
import Profile from "../components/Profile";
import ButtonsForMatch from "../components/ButtonsForMatch";

export default function Home(props) {
  const [ loading, setLoading ] = useState(true);
  const [ profile, setProfile ] = useState({});

  async function getProfile() {
    setLoading(true);
    try {
      setProfile((await getProfileToChoose()).data.profile);
    } catch (error) {
      alert(`Erro ao pegar o próximo perfil\nErro: ${JSON.stringify(error)}`);
    }
    setLoading(false);
  }

  useEffect(() => { getProfile(); }, []);

  async function acceptProfile(accept) {
    setLoading(true);
    try {
      await choosePerson(profile.id, accept);
    } catch (error) {
      alert(`Erro ao aceitar o perfil\nErro: ${JSON.stringify(error)}`);
    }
    await getProfile();
    setLoading(false);
  }

  return (
    <main>
      <header className="end">
        <Logo/>
        <IconMatches className="purple" onClick={props.goToMatches}/>
      </header>
      {loading
        ? <Loading message="Procurando o seu próximo match"/>
        : <Profile {...profile}/>}
      <ButtonsForMatch acceptProfile={acceptProfile} disabled={loading || !profile}/>
    </main>
  );
}

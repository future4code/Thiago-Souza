import React from "react";
import { setToken } from "../api";
import useCoodinator from "../hooks/useCoordinator";

export default function Logout() {
  const { goToLogin } = useCoodinator();

  function logout() {
    setToken("");
    goToLogin();
  }

  return (
    <button onClick={logout}>
      Log Out
    </button>
  );
}

import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import Feed from "../pages/Feed";
import Post from "../pages/Post";
import NotFound from "../pages/NotFound";

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Login/>
        </Route>
        <Route exact path="/cadastro">
          <Cadastro/>
        </Route>
        <Route exact path="/feed">
          <Feed/>
        </Route>
        <Route exact path="/post/:id">
          <Post/>
        </Route>
        <Route>
          <NotFound/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

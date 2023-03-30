import React from "react";
import { Route, Switch } from "react-router-dom";
import LogIn from "./LogIn";
import Scroll from "./Scroll";
export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <LogIn />
        </Route>
        <Route exact path="/home/:id">
          <Scroll />
        </Route>
      </Switch>
    </div>
  );
}

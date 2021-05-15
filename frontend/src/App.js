import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import People from "./components/pages/people";
import EditPersonForm from "./components/editPersonForm";
import NewPersonForm from "./components/newPersonForm";
import NavBar from "./components/navbar";
import NotFound from "./components/notFound";
import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="Container">
          <Switch>
            <Route path="/person/all" component={People}></Route>
            <Route path="/person/edit/:id" component={EditPersonForm}></Route>
            <Route path="/person/delete/:id" component={People}></Route>
            <Route path="/person/new" component={NewPersonForm}></Route>
            <Route path="/notfound" component={NotFound}></Route>
            <Redirect from="/" to="/person" />
            <Redirect to="/notfound" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;

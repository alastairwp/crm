import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import People from "./components/pages/people";
import EditPersonForm from "./components/editPersonForm";
import NewPersonForm from "./components/newPersonForm";
import NavBar from "./components/navbar";
import ViewProfile from "./components/pages/viewProfile";
import NotFound from "./components/notFound";
import "./App.css";

class App extends Component {
  profileFields = [
    { name: "firstName", label: "First name", type: "text" },
    { name: "lastName", label: "Last name", type: "text" },
    { name: "jobTitle", label: "Job title", type: "text" },
    { name: "role", label: "Role", type: "text" },
    { name: "organisation", label: "Organisation", type: "Text" },
    { name: "department", label: "Department", type: "text" },
    { name: "email", label: "Email", type: "text" },
    { name: "phoneWork", label: "Phone (work)", type: "text" },
    { name: "phoneMobile", label: "Phone (mob)", type: "text" },
    { name: "location", label: "Location", type: "text" },
  ];

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="Container">
          <Switch>
            <Route path="/person/all" component={People}></Route>
            <Route
              path="/person/edit/:id"
              render={(props) => (
                <EditPersonForm {...props} profileFields={this.profileFields} />
              )}
            ></Route>
            <Route
              path="/person/profile/:id"
              render={(props) => (
                <ViewProfile {...props} profileFields={this.profileFields} />
              )}
            ></Route>
            <Route
              path="/person/new"
              render={(props) => (
                <NewPersonForm {...props} profileFields={this.profileFields} />
              )}
            ></Route>
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

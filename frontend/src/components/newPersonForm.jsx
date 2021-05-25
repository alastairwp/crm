import React, { Component } from "react";
import InputField from "./common/inputField";
import "../index.css";
import { newPerson, getPersonByName } from "../utils/personAPI";

class NewPersonForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName } = this.state;
    if (firstName && lastName) {
      getPersonByName({ firstname: firstName, lastname: lastName }, (res) => {
        if (
          res.data.firstName === firstName &&
          res.data.lastName === lastName
        ) {
          e.preventDefault();
          console.log(
            `Can not add new record. Person with name ${firstName} already exists`
          );
        } else {
          console.log("add new user");
          newPerson(this.state);
          this.props.history.push("/person/all");
        }
      });
    } else {
      console.log("You must add a minimum of Firstname and Lastname");
    }
  };

  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { profileFields } = this.props;
    return (
      <form className="row g-3" style={{ maxWidth: "390px" }}>
        <div className="input-container">
          {profileFields.map((f) => (
            <InputField
              key={f.name}
              name={f.name}
              label={f.label}
              type={f.type}
              value={this.state[f.name]}
              onChange={this.handleInputChange}
            />
          ))}

          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.onSubmit.bind(this)}
          >
            Save
          </button>
        </div>
      </form>
    );
  }
}

export default NewPersonForm;

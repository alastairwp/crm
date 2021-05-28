import React, { Component } from "react";
import InputField from "./common/inputField";
import "../index.css";
import { newPerson, getPersonByName } from "../utils/personAPI";
import { raiseNotification } from "../index";

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
      const res = await getPersonByName({
        firstName: firstName,
        lastName: lastName,
      });

      if ((res.status === 200) & (res.data !== null)) {
        if (
          res.data.firstName === firstName &&
          res.data.lastName === lastName
        ) {
          raiseNotification(
            "Validation Warning",
            `Can not add new record. Person with name ${firstName} ${lastName} already exists`,
            "warning"
          );
        }
      } else {
        const res = await newPerson(this.state);
        if (res.status === 200 && res.data !== null) {
          this.props.history.push("/person/all");
          raiseNotification(
            "",
            `New person ${firstName} ${lastName} added successfully`,
            "success"
          );
        }
      }
    } else {
      raiseNotification(
        "Validation Warning",
        "You must add a minimum of Firstname and Lastname",
        "warning"
      );
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
      <form className="row g-3" style={{ maxWidth: "400px" }}>
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

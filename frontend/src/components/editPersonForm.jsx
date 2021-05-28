import React, { Component } from "react";
import InputField from "./common/inputField";
import "../index.css";
import { updatePerson, getPersonById } from "../utils/personAPI";
import { raiseNotification } from "../index";

class EditPersonForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount = async () => {
    this.getUser();
  };

  getUser = async () => {
    const personId = this.props.match.params.id;
    try {
      const res = await getPersonById(personId);
      console.log(res);
      if (res.status === 200 && res.data !== null) {
        this.setState(res.data);
      } else {
        raiseNotification(
          "Error",
          "Could not get user with id: " + personId,
          "danger"
        );
      }
    } catch (err) {
      raiseNotification("API Error", "me " + err.message, "danger");
    }
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const updatedPerson = this.state;
    try {
      const res = await updatePerson(updatedPerson);
      if (res.status === 200 && res.data !== null) {
        raiseNotification(
          "",
          `Profile '${updatedPerson.firstName} ${updatedPerson.lastName}' was updated successfully`,
          "success"
        );
      } else {
        raiseNotification(
          "Error",
          `Could not update user ${updatePerson.firstName} ${updatePerson.lastName}`,
          "danger"
        );
      }
    } catch (err) {
      raiseNotification("API Error", err.message, "danger");
    }

    this.props.history.push("/person/all");
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
      <form>
        <div className="input-container">
          {profileFields.map((f) => (
            <InputField
              key={f.name}
              name={f.name}
              label={f.label}
              type={f.type}
              value={this.state[f.name] || ""}
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

export default EditPersonForm;

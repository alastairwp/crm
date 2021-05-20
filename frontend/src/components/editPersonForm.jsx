import React, { Component } from "react";
import InputField from "./common/inputField";
import "../index.css";
import { updatePerson, getPerson } from "../utils/personAPI";

class EditPersonForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      firstName: "",
      lastName: "",
      jobTitle: "",
      role: "",
      organisation: "",
      department: "",
      email: "",
      phoneWork: "",
      phoneMobile: "",
      location: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount = async () => {
    this.getUser();
  };

  getUser() {
    const personId = this.props.match.params.id;
    getPerson(personId, (res) => {
      this.setState(res.data);
    });
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const updatedPerson = this.state;
    updatePerson(updatedPerson);
    this.props.history.push("/person/all");
    console.log("to be updated: " + this.state);
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

export default EditPersonForm;

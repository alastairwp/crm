import React, { Component } from "react";
import axios from "axios";
import InputField from "./common/inputField";
import "../index.css";

class NewPersonForm extends Component {
  inputFields = [
    { name: "firstName", label: "First name", type: "text" },
    { name: "lastName", label: "Last name", type: "text" },
    { name: "jobTitle", label: "Job Title", type: "text" },
    { name: "role", label: "Role", type: "text" },
    { name: "organisation", label: "Organisation", type: "Text" },
    { name: "department", label: "Department", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "phoneWork", label: "Phone (work)", type: "text" },
    { name: "phoneMobile", label: "Phone (mob)", type: "text" },
  ];

  constructor(props) {
    super(props);
    this.state = {
      id: "",
      firstName: "",
      lastName: "",
      jobTitle: "",
      role: "",
      organisation: "",
      department: "",
      email: "",
      phoneWork: "",
      phoneMobile: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  onSubmit = async (e) => {
    const newPerson = this.state;
    e.preventDefault();
    await axios
      .post("http://localhost:5000/api/person", newPerson)
      .then((res) => {
        this.props.history.push("/person/all");
      });
  };

  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <form>
        <div className="input-container">
          {this.inputFields.map((f) => (
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

import React, { Component } from "react";
import axios from "axios";
import InputField from "./common/inputField";
import "../index.css";

class NewPersonForm extends Component {
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
      location: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  onSubmit = async (e) => {
    const newPerson = this.state;
    //e.preventDefault();
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
    const { profileFields } = this.props;
    return (
      <form class="row g-3">
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

import React, { Component } from "react";
import axios from "axios";
import InputField from "./common/inputField";
import "../index.css";

class EditPersonForm extends Component {
  inputFields = [
    { name: "firstName", label: "First name", type: "text" },
    { name: "lastName", label: "Last name", type: "text" },
    { name: "role", label: "Role", type: "text" },
    { name: "organisation", label: "Organisation", type: "Text" },
    { name: "department", label: "Department", type: "text" },
    { name: "email", label: "Email", type: "text" },
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
    e.preventDefault();
    const updatedPerson = this.state;
    console.log("to be updated: " + this.state);
    await axios
      .patch(`http://localhost:5000/api/person/${this.state.id}`, updatedPerson)
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

  componentDidMount = async () => {
    const personId = this.props.match.params.id;
    await axios
      .get(`http://localhost:5000/api/person/${personId}`)
      .then((res) => {
        this.setState({
          id: res.data._id,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          role: res.data.role,
          organisation: res.data.organisation,
          department: res.data.department,
          email: res.data.email,
          phoneWork: res.data.phoneWork,
          phoneMobile: res.data.phoneMobile,
        });
      });
  };

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

export default EditPersonForm;

import React, { Component } from "react";
import axios from "axios";
import TableHeader from "./common/tableHeader";
import TableBody from "./common/tableBody";

export default class PersonTable extends Component {
  columns = [
    { path: "firstName", label: "First name" },
    { path: "lastName", label: "Last name" },
    { path: "role", label: "Role" },
    { path: "organisation", label: "Organisation" },
    { path: "department", label: "Department" },
  ];

  state = {
    persons: [],
  };

  getAllUsers() {
    axios.get(`http://localhost:5000/api/person`).then((res) => {
      const persons = res.data;
      this.setState({ persons });
    });
  }

  componentDidMount() {
    this.getAllUsers();
  }

  handleDelete = async (personId) => {
    await axios
      .delete(`http://localhost:5000/api/person/${personId}`)
      .then((res) => {
        console.log(res.data.deletedCount + " person(s) deleted successfully");
      });
    this.getAllUsers();
  };

  render() {
    const persons = this.state.persons;

    return (
      <table className="table">
        <TableHeader columns={this.columns} />
        <TableBody persons={persons} onDelete={this.handleDelete} />
      </table>
    );
  }
}

import React, { Component } from "react";
import PersonTable from "../personTable";
import axios from "axios";

class People extends Component {
  state = {
    persons: [],
  };

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

  getAllUsers() {
    axios.get(`http://localhost:5000/api/person`).then((res) => {
      const persons = res.data;
      this.setState({ persons });
    });
  }

  render() {
    return (
      <div className="person-table-container">
        <PersonTable
          onDelete={this.handleDelete}
          persons={this.state.persons}
        />
      </div>
    );
  }
}

export default People;

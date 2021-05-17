import React, { Component } from "react";
import TableHeader from "./common/tableHeader";
import TableBody from "./common/tableBody";
import { Link } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
library.add(faTrash, faEdit);

export default class PersonTable extends Component {
  columns = [
    //{
    //  key: "fullname",
    //  content: (person) => `${person.firstName} ${person.lastName}`,
    //  label: "Full name",
    //},
    { path: "firstName", label: "First name" },
    { path: "lastName", label: "Last name" },
    { path: "role", label: "Role" },
    { path: "organisation", label: "Organisation" },
    { path: "department", label: "Department" },
    {
      key: "edit",
      content: (person) => (
        <Link to={`/person/edit/${person._id}`}>
          <FontAwesomeIcon icon="edit" />
        </Link>
      ),
    },
    {
      key: "delete",
      content: (person) => (
        <button
          style={{ padding: "0", border: "none", background: "none" }}
          onClick={() => this.props.onDelete(person._id)}
        >
          <FontAwesomeIcon icon="trash" />
        </button>
      ),
    },
  ];

  render() {
    const { persons, sortColumn, onSort } = this.props;

    return (
      <table className="table">
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody
          persons={persons}
          columns={this.columns}
          onDelete={this.handleDelete}
        />
      </table>
    );
  }
}

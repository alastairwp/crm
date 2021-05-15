import React, { Component } from "react";
import { Link } from "react-router-dom";

class TableBody extends Component {
  render() {
    const { persons, onDelete } = this.props;
    return (
      <tbody>
        {persons.map((p) => (
          <tr key={p._id}>
            <td>{p.firstName}</td>
            <td>{p.lastName}</td>
            <td>{p.role}</td>
            <td>{p.organisation}</td>
            <td>{p.department}</td>
            <td>
              <Link className="btn btn-primary" to={`/person/edit/${p._id}`}>
                Edit
              </Link>
              <button
                className="btn btn-danger"
                onClick={() => onDelete(p._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;

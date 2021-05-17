import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  renderCell = (person, column) => {
    if (column.content) {
      return column.content(person);
    } else {
      return _.get(person, column.path);
    }
  };

  columnKey = (person, column) => {
    return person._id + (column.path || column.key);
  };

  render() {
    const { persons, columns } = this.props;
    return (
      <tbody>
        {persons.map((person) => (
          <tr key={person._id}>
            {columns.map((column) => (
              <td key={this.columnKey(person, column)}>
                {this.renderCell(person, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;

import React, { Component } from "react";

class TableHeader extends Component {
  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th scope="col" key={column.path}>
              {column.label}
            </th>
          ))}
          <th></th>
        </tr>
      </thead>
    );
  }
}

export default TableHeader;

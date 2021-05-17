import React, { Component, Fragment } from "react";
import PersonTable from "../personTable";
import axios from "axios";
//import ListGroup from "../common/listGroup";
import Pagination from "../common/pagination";
import ItemCounter from "../common/itemCounter";
import { paginate } from "../../utils/paginate";
import _ from "lodash";

class People extends Component {
  state = {
    persons: [],
    pageSize: 10,
    currentPage: 1,
    sortColumn: { path: "firstName", order: "asc" },
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

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const { persons, sortColumn, pageSize, currentPage } = this.state;
    if (persons.length === 0)
      return <p>There are no people in the CRM database</p>;

    const sorted = _.orderBy(persons, [sortColumn.path], [sortColumn.order]);
    const pagedPersons = paginate(sorted, currentPage, pageSize);

    return (
      <Fragment>
        <div className="person-table-container">
          <PersonTable
            onDelete={this.handleDelete}
            persons={pagedPersons}
            sortColumn={sortColumn}
            onSort={this.handleSort}
          />
          <ItemCounter itemsCount={persons.length} />
          <Pagination
            itemsCount={persons.length}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </Fragment>
    );
  }
}

export default People;

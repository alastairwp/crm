import React, { Component } from "react";
import PersonTable from "../personTable";
import axios from "axios";
import Dropdown from "../common/dropdown";
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

  handleOrgSelect = (org) => {
    this.setState({ selectedOrg: org, currentPage: 1 });
  };

  getUniqueOrgs = (persons) => {
    const Orgs = [];
    const uniqueOrgs = [];
    persons.forEach((person) => {
      const findOrg = Orgs.find((x) => x.organisation === person.organisation);
      if (!findOrg) {
        Orgs.push(person);
        uniqueOrgs.push(person.organisation);
      }
    });
    return uniqueOrgs;
  };

  render() {
    const { persons, sortColumn, pageSize, currentPage, selectedOrg } =
      this.state;
    const uniqueOrgs = this.getUniqueOrgs(persons);
    if (persons.length === 0)
      return <p>There are no people in the CRM database</p>;

    // Filter

    const filteredByOrg =
      selectedOrg && selectedOrg !== "All organisations"
        ? persons.filter((person) => person.organisation === selectedOrg)
        : persons;

    // Sort
    const sorted = _.orderBy(
      filteredByOrg,
      [sortColumn.path],
      [sortColumn.order]
    );

    // Paginate
    const pagedPersons = paginate(sorted, currentPage, pageSize);

    return (
      <div className="container">
        <div className="row">
          <div className="col-2">
            <Dropdown
              onItemSelect={this.handleOrgSelect}
              selectedOrg={this.state.selectedOrg}
              uniqueOrgs={uniqueOrgs}
            />
          </div>
          <div className="col-10">
            <PersonTable
              onDelete={this.handleDelete}
              persons={pagedPersons}
              sortColumn={sortColumn}
              onSort={this.handleSort}
            />
            <ItemCounter itemsCount={filteredByOrg.length} />
            <Pagination
              itemsCount={filteredByOrg.length}
              pageSize={pageSize}
              onPageChange={this.handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default People;

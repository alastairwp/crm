import React, { Component } from "react";
import PersonTable from "../personTable";
import Dropdown from "../common/dropdown";
import Pagination from "../common/pagination";
import ItemCounter from "../common/itemCounter";
import { paginate } from "../../utils/paginate";
import { getAllPersons, deletePerson } from "../../utils/personAPI";
import _ from "lodash";
import PageSizeDropdown from "../common/pageSizeDropdown";
import { raiseNotification } from "../../index";

class People extends Component {
  state = {
    persons: [],
    pageSize: 10,
    currentPage: 1,
    sortColumn: { path: "firstName", order: "asc" },
    pageSizes: [10, 25, 50, 100],
  };

  componentDidMount() {
    this.getAllUsers();
  }

  handleDelete = async (personId) => {
    try {
      const res = await deletePerson(personId);
      if (res.data.deletedCount === 1) {
        raiseNotification("", "Person was deleted successfully", "success");
        this.getAllUsers();
      }
    } catch (err) {
      raiseNotification(
        "Error",
        `Person could not be deleted: ${err.message}`,
        "danger"
      );
    }
  };

  getAllUsers = async () => {
    try {
      const res = await getAllPersons();
      if (res.status === 200 && res.data !== null) {
        this.setState({ persons: res.data });
      }
    } catch (err) {
      raiseNotification(
        "Error",
        `Person could not get all persons: ${err.message}`,
        "danger"
      );
    }
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handlePageSizeSelect = (pageSize) => {
    this.setState({ pageSize: pageSize });
  };

  handleOrgSelect = (org) => {
    if (org.organisation === "All organisations") {
      this.setState({ selectedDept: undefined });
    }

    this.setState({ selectedOrg: org.organisation, currentPage: 1 });
  };

  handleDeptSelect = (org) => {
    this.setState({ selectedDept: org.department, currentPage: 1 });
  };

  getUniqueOrgs = (persons) => {
    const uniqueOrgs = [];
    uniqueOrgs.push({ organisation: "All organisations" });
    persons.forEach((person) => {
      const findOrg = uniqueOrgs.find(
        (x) => x.organisation === person.organisation
      );
      if (!findOrg) {
        uniqueOrgs.push(person);
      }
    });
    return uniqueOrgs;
  };

  getUniqueDepts = (persons) => {
    const uniqueDepts = [];
    uniqueDepts.push({ department: "All departments" });
    persons.forEach((person) => {
      const findDept = uniqueDepts.find(
        (x) => x.department === person.department
      );
      if (!findDept) {
        uniqueDepts.push(person);
      }
    });
    return uniqueDepts;
  };

  render() {
    const {
      persons,
      sortColumn,
      pageSize,
      currentPage,
      selectedOrg,
      selectedDept,
      pageSizes,
    } = this.state;
    const uniqueOrgs = this.getUniqueOrgs(persons);

    if (persons.length === 0)
      return <p>There are no people in the CRM database</p>;

    // Filters

    const filteredByOrg =
      selectedOrg && selectedOrg !== "All organisations"
        ? persons.filter((person) => person.organisation === selectedOrg)
        : persons;

    const filteredByDept =
      selectedDept && selectedDept !== "All departments"
        ? filteredByOrg.filter((person) => person.department === selectedDept)
        : undefined;

    // Sort
    const sorted = _.orderBy(
      filteredByDept === undefined ? filteredByOrg : filteredByDept,
      [sortColumn.path],
      [sortColumn.order]
    );
    const uniqueDepts = this.getUniqueDepts(filteredByOrg);
    // Paginate
    const pagedPersons = paginate(sorted, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-2">
          <h5>Filters</h5>
          <Dropdown
            type="organisation"
            placeholderText="Select organisation"
            onItemSelect={this.handleOrgSelect}
            selectedOrg={this.state.selectedOrg}
            uniqueOrgs={uniqueOrgs}
          />
          <Dropdown
            type="department"
            placeholderText="Select department"
            onItemSelect={this.handleDeptSelect}
            selectedOrg={this.state.selectedDept}
            uniqueOrgs={uniqueDepts}
          />
        </div>
        <div className="col-10">
          <div className="row">
            <PersonTable
              onDelete={this.handleDelete}
              persons={pagedPersons}
              sortColumn={sortColumn}
              onSort={this.handleSort}
            />
          </div>

          <div className="container-body">
            <div className="row">
              <div className="col">
                <ItemCounter itemsCount={filteredByOrg.length} />
              </div>
              <div className="col">
                <Pagination
                  itemsCount={filteredByOrg.length}
                  pageSize={pageSize}
                  onPageChange={this.handlePageChange}
                  currentPage={currentPage}
                />
              </div>
              <div className="col">
                <PageSizeDropdown
                  pageSizes={pageSizes}
                  pageSize={pageSize}
                  onItemSelect={this.handlePageSizeSelect}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default People;

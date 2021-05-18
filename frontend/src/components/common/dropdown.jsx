import React from "react";

const Dropdown = (props) => {
  const { uniqueOrgs, selectedOrg, onItemSelect } = props;

  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {selectedOrg ? selectedOrg : "Select organisation"}
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li key="all" onClick={() => onItemSelect("All organisations")}>
          <a className="dropdown-item" href="#/">
            All organisations
          </a>
        </li>
        {uniqueOrgs.map((org) => (
          <li key={org} onClick={() => onItemSelect(org)}>
            <a className="dropdown-item" href="#/">
              {org}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;

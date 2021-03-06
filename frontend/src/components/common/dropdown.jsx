import React from "react";

const Dropdown = (props) => {
  const { uniqueOrgs, selectedOrg, onItemSelect, placeholderText, type } =
    props;

  return (
    <div className="dropdown filter-dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {selectedOrg ? selectedOrg : placeholderText}
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        {uniqueOrgs.map((org) => (
          <li key={org._id || org[type]} onClick={() => onItemSelect(org)}>
            <a className="dropdown-item" href="#/">
              {org[type]}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;

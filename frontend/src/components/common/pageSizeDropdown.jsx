import React from "react";

const PageSizeDropdown = (props) => {
  const { pageSizes, pageSize, onItemSelect } = props;
  return (
    <div className="dropdown" style={{ textAlign: "right" }}>
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {pageSize}
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        {pageSizes.map((page) => (
          <li key={page} onClick={() => onItemSelect(page)}>
            <a className="dropdown-item" href="#/">
              {page}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PageSizeDropdown;

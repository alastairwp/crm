import React, { Component } from "react";

class InputField extends Component {
  render() {
    const { name, label, type, onChange, value } = this.props;

    return (
      <div className="mb-3 row">
        <label htmlFor={name} className="col-sm-3 col-form-label">
          {label}
        </label>
        <div className="col-sm-10">
          <div className="input-group">
            {type === "email" ? (
              <span className="input-group-text" id="inputGroupPrepend">
                @
              </span>
            ) : (
              ""
            )}
            <input
              name={name}
              type={type}
              className="form-control"
              id={name}
              value={value}
              onChange={(event) => onChange(event)}
              aria-describedby="inputGroupPrepend"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default InputField;

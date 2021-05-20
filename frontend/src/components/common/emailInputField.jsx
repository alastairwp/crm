import React, { Component } from "react";

class EmailInputField extends Component {
  render() {
    const { name, label, onChange, value } = this.props;
    return (
      <div className="mb-3 row">
        <label htmlFor={name} className="col-sm-3 col-form-label">
          {label}
        </label>
        <div className="col-sm-10">
          <div className="input-group has-validation">
            <span class="input-group-text" id="inputGroupPrepend">
              @
            </span>
            <input
              name={name}
              type="email"
              className="form-control"
              id={name}
              value={value}
              onChange={(event) => onChange(event)}
              aria-describedby="inputGroupPrepend"
              required
            />
            <div className="invalid-feedback">
              Please enter an email address.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default InputField;

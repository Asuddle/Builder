import React, { useState } from "react";
import PropTypes from "prop-types";

// Camel Case Formatter
String.prototype.toCamelCase = function () {
  return this.replace(/^([A-Z])|\s(\w)/g, function (match, p1, p2, offset) {
    if (p2) return p2.toUpperCase();
    return p1.toLowerCase();
  });
};

const Switch = ({setState}) => {
  const [isChecked, setIsChecked] = useState(true);
  let switchClass = "";
  let id = "Switch One".toCamelCase();
  switchClass += " switch--large";

  return (
    <div className="switch-wrapper">
      <div aria-label={"Switch One"} className={switchClass}>
        <label className="switch__label" htmlFor={id}>
          <input
            role="switch"
            type="checkbox"
            className="switch__input"
            id={id}
            checked={isChecked}
            onClick={(e) => {
              setIsChecked(e.target.checked);
              setState(e.target.checked)
            }}
          />
          <span
            className="switch__text"
            data-on="Al Fursan"
            data-off="Others"
          ></span>
          <span className="switch__handle"></span>
        </label>
      </div>
    </div>
  );
};

export default Switch;

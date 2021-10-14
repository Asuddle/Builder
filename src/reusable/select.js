import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { CInvalidFeedback } from "@coreui/react";
function SelectInput({
  creatable = false,
  options,
  setValue,
  value,
  name,
  isSearchable = true,
  isClearable = false,
  handleBlur,
  error,
  customHandleChange = false,
  touched,
}) {
  const handleBlurEvent = () => {
    handleBlur(name, true);
  };
  const style = {
    control: (base) => ({
      ...base,
      border: error && touched ? "1px solid #E64F4F" : "1px solid #D8DBE0",
      // This line disable the blue border
      boxShadow: "none",
      "&:hover": {
        borderColor: error && touched ? "#E64F4F" : "#D8DBE0",
      },
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: error && touched ? "#E64F4F" : "#D8DBE0",
    }),
  };
  return (
    <>
      {!creatable ? (
        <Select
          className="basic-single"
          classNamePrefix="select"
          value={
            options ? options.find((option) => option.value === value) : ""
          }
          isClearable={isClearable}
          isSearchable={isSearchable}
          onChange={
            customHandleChange
              ? customHandleChange
              : (e) => {
                  setValue(name, e.value);
                }
          }
          onBlur={handleBlurEvent}
          name={name}
          options={options}
          styles={style}
        />
      ) : (
        <CreatableSelect
          isClearable
          value={
            options ? options.find((option) => option.value === value) : ""
          }
          isSearchable={isSearchable}
          onChange={(e) => {
            if (e == null) {
              setValue(name, "");
            } else {
              setValue(name, e.value);
            }
          }}
          onBlur={handleBlurEvent}
          name={name}
          styles={style}
          options={options}
        />
      )}
      {touched && error && (
        <div style={{ display: "block" }} className="invalid-feedback">
          {error}
        </div>
      )}
    </>
  );
}

SelectInput.propTypes = {};

export default SelectInput;

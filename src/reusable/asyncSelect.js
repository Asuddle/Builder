import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Async from "react-select/async";

import CreatableSelect from "react-select/creatable";
import { CInvalidFeedback } from "@coreui/react";
import axios from "axios";
function AsyncSelect({
  creatable = false,
  options,
  setValue,
  value,
  name,
  isSearchable = true,
  isClearable = false,
  handleBlur,
  error,
  touched,
  disable = false,
  url = "admin",
  optionLabel = "name",
  optionValue = "id",
}) {
  const [optionData, setOptionData] = useState([]);
  const [targetUrl, setTargetUrl] = useState("admin");
  useEffect(() => {
    console.log(url);
    setTargetUrl(url);
  }, [url]);
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
  const loadOptions = (inputValue, callback) => {
    axios.get(`http://138.68.66.215/${targetUrl}`).then((res) => {
      let arr = [];
      res.data.forEach((item) => {
        arr.push({
          label: item[optionLabel],
          value:
            optionValue == "id" ? JSON.stringify(item.id) : item[optionValue],
        });
      });
      setOptionData(arr);
      callback(arr);
    });
  };
  return (
    <>
      <Async
        loadOptions={loadOptions}
        defaultOptions
        onChange={(val) => {
          setValue(name, val.value);
          if (name == "assignedTo") {
            setValue("recievedBy", val.value);
          }
        }}
        onBlur={handleBlurEvent}
        name={name}
        value={optionData.filter((item) => item["value"] === value)}
        styles={style}
      />
      {touched && error && (
        <div style={{ display: "block" }} className="invalid-feedback">
          {error}
        </div>
      )}
    </>
  );
}

AsyncSelect.propTypes = {};

export default AsyncSelect;

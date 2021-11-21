import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import FileLongForm from "./longform";
import PricingComponent from "./pricing";
import { handleApi } from "src/reusable/api";
import { useHistory } from "react-router";

function EditModal({ open = false, handleClose = () => {}, data }) {
  const history = useHistory();
  const [isPricing, setIsPricing] = useState(false);
  const [firstForm, setFirstForm] = useState(data);
  const handleSubmitLongForm = (values) => {
    let temp = { ...values };
    delete temp["unitPrice"];
    delete temp["discountPercentage"];
    delete temp["minimumRequiredDeposit"];
    setFirstForm(temp);
    setIsPricing(true);
  };
  function removeCommas(str) {
    return str.replaceAll(",", "");
  }
  const handlePricing = (values, num) => {
    // setIsPricing(false);
    // handleClose();
    let finalValues = JSON.parse(JSON.stringify({ ...values, ...firstForm }));
    // finalValues["unitPrice"] = +removeCommas(finalValues["unitPrice"]);
    finalValues["depositPercentage"] = parseFloat(
      finalValues["depositPercentage"]
    );
    // finalValues["minimumRequiredDeposit"] = +removeCommas(
    //   finalValues["minimumRequiredDeposit"]
    // );
    delete finalValues["total_price"];
    delete finalValues["discount"];
    delete finalValues["payable"];
    delete finalValues["createdAt"];
    delete finalValues["id"];
    console.log(finalValues);
    // handleApi("put", `/plot-files/${values.id}`, finalValues).then((res) => {
    //   console.log("here is the res", res);
    // });
    history.push("/invoice");
  };
  const handleBack = () => {
    setIsPricing(!isPricing);
    console.log("back");
  };
  const handlingClose = () => {
    setIsPricing(false);
    handleClose();
  };

  return (
    <div>
      <CModal show={open} onClose={handlingClose}>
        <CModalHeader closeButton>
          <CModalTitle>Edit File</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {!isPricing ? (
            <FileLongForm
              data={data}
              handleClose={handlingClose}
              handleSubmit={handleSubmitLongForm}
              disableFields={true}
            />
          ) : (
            <PricingComponent
              data={{ form3: data }}
              handleFormData={handlePricing}
              handleBack={handleBack}
              noCard={true}
            />
          )}
        </CModalBody>
      </CModal>
    </div>
  );
}

EditModal.propTypes = {};

export default EditModal;

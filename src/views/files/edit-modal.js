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

function EditModal({ open = false, handleClose = () => {}, data }) {
  const [isPricing, setIsPricing] = useState(false);
  const handleSubmitLongForm = (values) => {
    setIsPricing(true);
  };
  const handlePricing = (values, num) => {
    setIsPricing(false);
    handleClose();
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

import React from "react";
import PropTypes from "prop-types";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
function DeleteFileModal({ open, handleClose, title = "File" }) {
  return (
    <CModal
      show={open}
      onClose={handleClose}
      color="danger"
      style={{ marginTop: "100px" }}
    >
      <CModalHeader closeButton>
        <CModalTitle>Delete {title}</CModalTitle>
      </CModalHeader>
      <CModalBody>Are you sure you want to delete the {title}?</CModalBody>
      <CModalFooter>
        <CButton color="danger" onClick={handleClose}>
          Delete
        </CButton>{" "}
        <CButton color="secondary" onClick={handleClose}>
          Cancel
        </CButton>
      </CModalFooter>
    </CModal>
  );
}

DeleteFileModal.propTypes = {};

export default DeleteFileModal;

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
import FilesComponent from "./index";
import AddFiles from "./add";
import AddInitialAssignment from "./initial-assignment";
import FileLongForm from "./longform";

function EditModal({ open = false, handleClose = () => {}, data }) {
  return (
    <div>
      <CModal show={open} onClose={handleClose} size="md">
        <CModalHeader closeButton>
          <CModalTitle>Edit File</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <FileLongForm  data={data}/>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary">Next</CButton>{" "}
          <CButton color="secondary" onClick={handleClose}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
}

EditModal.propTypes = {};

export default EditModal;

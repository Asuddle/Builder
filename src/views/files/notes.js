import React, { useState } from "react";
import PropTypes from "prop-types";
import TableComponent from "src/reusable/table";
import { NotesData } from "./notes-data";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CCol,
  CLabel,
  CTextarea,
  CFormGroup,
} from "@coreui/react";

function NotesComponents(props) {
  const [addNote, setAddNote] = useState(false);
  const handleClose = () => setAddNote(false);
  return (
    <div>
      <TableComponent
        data={NotesData}
        columns={[
          {
            dataField: "note",
            text: "Notes",
            headerStyle: () => {
              return { minWidth: "80%" };
            },
            sort: true,
          },
          {
            dataField: "created_by",
            text: "Created By",
            sort: true,
          },
          {
            dataField: "created_date",
            text: "Created Date",
            sort: true,
          },
        ]}
        title="Notes"
        addButton={"Add Notes"}
        callback={() => {
          setAddNote(true);
        }}
      />
      <CModal
        show={addNote}
        onClose={handleClose}
        color=""
        style={{ marginTop: "100px" }}
      >
        <CModalHeader closeButton>
          <CModalTitle>Add Note</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCol xs="12">
            <br />
            <CFormGroup>
              <CLabel htmlFor="textarea-input">
                <strong>Notes/Comments</strong>
              </CLabel>
              <CTextarea
                name="note"
                id="textarea-input"
                rows="4"
                name="note"
                placeholder="Content..."
              />
            </CFormGroup>
          </CCol>
        </CModalBody>
        <CModalFooter>
          <CButton color="success" onClick={handleClose}>
            Submit
          </CButton>{" "}
          <CButton color="secondary" onClick={handleClose}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
}

NotesComponents.propTypes = {};
export default NotesComponents;

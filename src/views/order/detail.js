import React, { useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import EditModal from "./edit-modal";

const OrderDetails = ({ match }) => {
  const data = useSelector((item) => item.files);
  const userDetails = data
    ? Object.entries(data)
    : [
        [
          "id",
          <span>
            <CIcon className="text-muted" name="cui-icon-ban" /> Not found
          </span>,
        ],
      ];
  let labelToName = {
    id: "Identificaton Number",
    file_name: "File Name",
    security_code: "Security Code",
    type: "Type",
    assignment_date: "Assignment Date",
    received_by: "Received By",
    received_date: "Received By",
    project_name: "Project Name",
    assigned_to: "Assigned To",
    price: "Price",
    deposit: "Deposit",
    deposit_percentage: "Deposit Percentage",
    status: "Status",
    role: "Role",
  };
  const history = useHistory();
  const [isEdit, setIsEdit] = useState(false);
  return (
    <CRow>
      <EditModal
        open={isEdit}
        handleClose={() => {
          setIsEdit(false);
        }}
        data={data}
      />
      <CCol lg={12}>
        <CCard>
          <CCardHeader>
            <strong>Details</strong>
            <CButton
              onClick={() => {
                history.push(`/files/${data?data.id:'0'}/details/notes`);
              }}
              style={{ float: "right" }}
              color="success"
            >
              Notes
            </CButton>
            {"  "}
            <CButton
              onClick={() => {
                setIsEdit(true)
              }}
              style={{ float: "right", marginRight: "10px" }}
              color="primary"
            >
              Edit file
            </CButton>
          </CCardHeader>
          <CCardBody>
            <table className="table table-striped table-hover">
              <tbody>
                {userDetails.map(([key, value], index) => {
                  if (key !== "id") {
                    return (
                      <tr key={index.toString()}>
                        <td>{`${labelToName[key]}:`}</td>
                        <td>
                          <strong>{value}</strong>
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default OrderDetails;

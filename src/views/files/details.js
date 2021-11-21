import React, { useState, useEffect } from "react";
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
import { handleApi } from "src/reusable/api";

const FileDetails = ({ match }) => {
  const data = useSelector((item) => item.files);

  const [fileData, setFileData] = useState({});
  useEffect(() => {
    handleApi("get", `/plot-files/${match.params.id}`).then((res) => {
      setFileData(res.data);
    });
  }, []);
  const userDetails = fileData
    ? fileData
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
    fileNo: "File Number",
    fileSecurityNo: "Security Code",
    fileType: "Type",
    projectName: "Project Name",
    assignedDate: "Assignment Date",
    recievedBy: "Received By",
    received_date: "Received Date",
    companyName: "Company Name",
    assignedTo: "Assigned To",
    unitPrice: "Price",
    minimumRequiredDeposit: "Deposit",
    depositPercentage: "Deposit Percentage",
    status: "Status",
    role: "Role",
    recievedDate: "Recieved Date",
  };
  let basicInformation = [
    "projectName",
    "fileNo",
    "fileSecurityNo",
    "fileType",
    "status",
  ];
  let assignmentInformation = [
    "assignedTo",
    "assignedDate",
    "recievedBy",
    "received_date",
  ];
  let pricingInformation = [
    "unitPrice",
    "minimumRequiredDeposit",
    "depositPercentage",
  ];
  const history = useHistory();
  const [isEdit, setIsEdit] = useState(false);
  return (
    <CRow>
      <EditModal
        open={isEdit}
        handleClose={() => {
          setIsEdit(false);
        }}
        data={fileData}
      />
      <CCol lg={12}>
        <CCard>
          <CCardHeader>
            <strong>Details</strong>
            <CButton
              onClick={() => {
                history.push(
                  `/files/${fileData ? fileData.id : "0"}/details/notes`
                );
              }}
              style={{ float: "right" }}
              color="success"
            >
              Notes
            </CButton>
            {"  "}
            <CButton
              onClick={() => {
                setIsEdit(true);
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
                <h4>Basic Information</h4>
                <br />
                {basicInformation.map((item, index) => (
                  <tr key={index.toString()}>
                    <td>{`${labelToName[item]}:`}</td>
                    <td>
                      <strong>{userDetails[item]}</strong>
                    </td>
                  </tr>
                ))}
                <br />
                <h4>Assignment Information</h4>
                <br />
                {assignmentInformation.map((item, index) => (
                  <tr key={index.toString()}>
                    <td>{`${labelToName[item]}:`}</td>
                    <td>
                      <strong>{userDetails[item]}</strong>
                    </td>
                  </tr>
                ))}
                <br />
                <h4>Pricing Information</h4>
                <br />{" "}
                {pricingInformation.map((item, index) => (
                  <tr key={index.toString()}>
                    <td>{`${labelToName[item]}:`}</td>
                    <td>
                      <strong>{userDetails[item]}</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default FileDetails;

import React from "react";
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

const FileDetails = ({ match }) => {
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
    id:'Identificaton Number',
    file_name: "File Name",
    security_code: "Security Code",
    type: "Type",
    assignment_date: "Assignment Date",
    received_by: "Received By",
    received_date: "Received By",
    project_name:'Project Name',
    assigned_to: "Assigned To",
    price:'Price',
    deposit:'Deposit',
    deposit_percentage:'Deposit Percentage',
    status:'Status',
    role:'Role'
  };
  const history=useHistory()
  return (
    <CRow>
      <CCol lg={12}>
        <CCard>
          <CCardHeader>
            <strong>Details</strong>
            <CButton  onClick={()=>{history.push('/files/9/notes')}}style={{float:'right'}} color='success'>Notes</CButton>
            </CCardHeader>
          <CCardBody>
            <table className="table table-striped table-hover">
              <tbody>
                {userDetails.map(([key, value], index) => {
                  return (
                    <tr key={index.toString()}>
                      <td>{`${labelToName[key]}:`}</td>
                      <td>
                        <strong>{value}</strong>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default FileDetails;

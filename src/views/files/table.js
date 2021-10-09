import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { cilTrash, cilPencil, cilFile, cilCircle } from "@coreui/icons";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CFormGroup,
  CLabel,
  CSelect,
  CButton,
  CPagination,
  CInput,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { ReactComponent as AddIcon } from "./svg/add.svg";
import usersData from "../users/UsersData";
import { useDispatch } from "react-redux";

const getBadge = (status) => {
  switch (status) {
    case "Sold":
      return (
        <CBadge color="danger" className="mfs-auto">
          Sold
        </CBadge>
      );
    case "Reserved":
      return (
        <CBadge color="secondary" className="mfs-auto">
          Reserved
        </CBadge>
      );
    case "Available":
      return (
        <CBadge color="success" className="mfs-auto">
          Available
        </CBadge>
      );
    case "Banned":
      return "danger";
    default:
      return "primary";
  }
};

function addCommas(str) {
  return str
    .replace(/^0+/, "")
    .replace(/\D/g, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const FilesTable = ({ isEdit, isDelete }) => {
  const dispatch=useDispatch()
  const [onSelectClick, setOnSelectClick] = useState([]);
  const [value, onChange] = useState([new Date(), new Date()]);
  const selectRow = {
    mode: "checkbox",
    onSelect: (data, isSelect, rowIndex, e) => {
      if (isSelect) {
        let arr = [...onSelectClick];
        arr.push(data);
        setOnSelectClick(arr);
      } else {
        let id = data.id;
        let temp = [...onSelectClick];
        temp = temp.filter((item) => item.id !== id);
        setOnSelectClick(temp);
      }
    },
  };
  const actionButtons = (cell, row) => (
    <>
      <CButton
        color="info"
        size="sm"
        onClick={() => isEdit(row)}
        style={{ padding: "3px 5px" }}
      >
        <CIcon content={cilPencil} />
      </CButton>{" "}
      <CButton
        color="danger"
        size="sm"
        onClick={() => isDelete(row)}
        style={{ padding: "3px 5px" }}
      >
        <CIcon content={cilTrash} />
      </CButton>
      {"  "}
 
      <CButton
        color="success"
        size="sm"
        onClick={() => isDelete(row)}
        style={{ padding: "3px 5px" }}
      >
        <CIcon content={cilFile} />
      </CButton>
    </>
  );
  const columns = [
    {
      dataField: "file_name",
      text: "File Number",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { textAlign: "center" };
      },
      formatter: (cell, row) => (
        <>
          <p style={{ margin: "0px", textAlign: "center" }}>{cell}</p>
          <hr style={{ margin: "2px" }} />
          <div className="subtitle" style={{ textAlign: "center" }}>
            {row.status}{" "}
            <CIcon
              content={cilCircle}
              height={5}
              style={{ background: "darkGrey", borderRadius: "50%" }}
            />{" "}
            {row.type}
          </div>
        </>
      ),
    },
    {
      dataField: "security_code",
      text: "Security Code",
      sort: true,
    },
    {
      dataField: "assigned_to",
      text: "File Owner",
      sort: true,
    },
    {
      dataField: "id",
      text: "Product ID",
      align: "center",
      sort: true,
      hidden: true,
    },
    // {
    //   dataField: "project_name",
    //   text: "Project Name",
    //   sort: true,
    // },
    {
      dataField: "assignment_date",
      text: "Assigned Date",
      sort: true,
    },

    {
      dataField: "price",
      text: "Price (Rs)",
      formatter: (cell) => addCommas(cell),
      sort: true,
    },

    // {
    //   dataField: "type",
    //   text: "Type",
    // },
    // {
    //   dataField: "status",
    //   text: "Status",
    //   formatter: getBadge,
    // },

    {
      dataField: "role",
      text: "Actions",
      formatter: actionButtons,
    },
  ];

  const history = useHistory();
  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>Files</CCardHeader>
          <CCardBody>
            <CRow>
              <CCol xs={2}>
                <CFormGroup>
                  <CLabel>
                    Type
                  </CLabel>
                  <CSelect
                    name="type"
                    onChange={(e) => {}}
                    custom
                    name="type"
                    id="ccmonth"
                  >
                    <option value="">Enter Type</option>
                    <option value="5 Marla">5 Marla</option>
                    <option value="10 Marla">10 Marla</option>
                    <option value="15 Marla">15 Marla</option>
                    <option value="20 Marla">20 Marla</option>
                  </CSelect>
                </CFormGroup>
              </CCol>
              <CCol xs={2}>
                <CFormGroup>
                  <CLabel>
                    Status
                  </CLabel>
                  <CSelect
                    name="type"
                    onChange={(e) => {}}
                    custom
                    name="type"
                    id="ccmonth"
                  >
                    <option value="">Enter Status</option>
                    <option value="5 Marla">Sold</option>
                    <option value="10 Marla">Available</option>
                    <option value="15 Marla">Reserved</option>
                  </CSelect>
                </CFormGroup>
              </CCol>
              <CCol xs={2}>
                <CFormGroup>
                <CLabel>
                Assigned To
                  </CLabel>
                  <CSelect
                    name="type"
                    onChange={(e) => {}}
                    custom
                    name="type"
                    id="ccmonth"
                  >
                    <option value="">Assigned To</option>
                    <option value="Ali">Ali</option>
                      <option value="Usman">Usman</option>
                      <option value="Daniel">Daniel</option>
                      <option value="Usman">Usman</option>
                  </CSelect>
                </CFormGroup>
              </CCol>
              <CCol xs={3}>
                <CLabel>Assigned Date</CLabel> 
                <br/>
              <DateRangePicker
              onChange={onChange}
              value={value}
              />    
              </CCol>
              <CCol xs={3} style={{marginTop:'25px'}}>
                <CButton
                  style={{
                    marginRight: "20px",
                    float: "right",
                  }}
                  onClick={() => {
                    history.push("/files/add");
                  }}
                  color="success"
                  size="md"
                >
                  {/* <AddIcon />  */}
                  Add File
                </CButton>
                {!onSelectClick.length == 0 && (
                  <CButton
                    style={{
                      paddingRight: "16px",
                      marginRight: "10px",
                    }}
                    onClick={()=>{
                      dispatch({type:'setFile',files:onSelectClick})
                      history.push('/files/transfer')
                      console.log(onSelectClick)
                    }}
                    color="secondary"
                    size="md"
                  >
                    Transfer File
                  </CButton>
                )}{" "}
              </CCol>
            </CRow>
            <br />

            <BootstrapTable
              striped
              bootstrap4
              hover
              keyField="id"
              data={usersData}
              columns={columns}
              selectRow={selectRow}
              bordered={false}
              pagination={paginationFactory()}
              exportCSV={{
                fileName: "custom.csv",
                separator: "|",
                ignoreHeader: true,
                noAutoBOM: false,
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default FilesTable;

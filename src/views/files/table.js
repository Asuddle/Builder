import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { cilTrash, cilPencil, cilFile, cilCircle } from "@coreui/icons";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CFormGroup,
  CLabel,
  CSelect,
  CButton,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import usersData from "../users/UsersData";
import { useDispatch } from "react-redux";
import axios from "axios";

function addCommas(str) {
  return str
    .replace(/^0+/, "")
    .replace(/\D/g, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const getBadge = (status) => {
  switch (status) {
    case "Sold":
      return (
        <span style={{ color: "red" }} color="danger" className="mfs-auto">
          Sold
        </span>
      );
    case "Reserved":
      return (
        <span style={{ color: "grey" }} color="secondary">
          Reserved
        </span>
      );
    case "Available":
      return (
        <span style={{ color: "green" }} color="success">
          Available
        </span>
      );
    default:
      return "primary";
  }
};

const FilesTable = ({ isEdit, isDelete, refresh }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("http://138.68.66.215/plot-files").then((res) => {
      console.log("res is here", res.data);
      setData(res.data);
    });
  }, [refresh]);
  const dispatch = useDispatch();
  var SVGComponent = (props) => <svg {...props}>{props.children}</svg>;
  var CircleComponent = (props) => <circle {...props}>{props.children}</circle>;
  const actionButtons = (cell, row) => (
    <>
      <CIcon
        content={cilFile}
        width="20"
        style={{ cursor: "pointer" }}
        onClick={() => {
          dispatch({ type: "setFile", files: row });
          history.push(`/files/${row.id}/details`);
        }}
      />
      {"  "}

      <CIcon
        content={cilPencil}
        style={{ cursor: "pointer" }}
        width="20"
        onClick={() => isEdit(row)}
      />
      {"  "}

      <CIcon
        content={cilTrash}
        style={{ cursor: "pointer" }}
        width="20"
        onClick={() => isDelete(row)}
      />
      {/* </CButton>s */}
      {"  "}
    </>
  );
  const columns = [
    {
      dataField: "fileNo",
      text: "File Number",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { textAlign: "center" };
      },
      formatter: (cell, row) => (
        <>
          <p
            style={{
              margin: "0px",
              textAlign: "center",
            }}
          >
            {cell}
          </p>
          <hr style={{ margin: "2px" }} />
          <div
            className="subtitle"
            style={{ textAlign: "center", fontSize: "14px" }}
          >
            {getBadge(row.status)}{" "}
            <CIcon
              content={cilCircle}
              height={5}
              style={{
                background: "darkGrey",
                borderRadius: "50%",
              }}
            />{" "}
            {row.fileType}
          </div>
        </>
      ),
    },
    {
      dataField: "fileSecurityNo",
      text: "Security Code",
      sort: true,
    },
    {
      dataField: "projectName",
      text: "File Owner",
      headerStyle: (colum, colIndex) => {
        return { textAlign: "center" };
      },
      formatter: (cell, row) => (
        <div style={{ textAlign: "center" }}>
          <SVGComponent height="36" width="36">
            <CircleComponent
              cx="18"
              cy="18"
              r="18"
              fill="#edcf82"
              stroke=""
              strokeWidth="4"
            />
            <linearGradient
              id="paint0_linear"
              x1="1.6"
              y1="9.48149"
              x2="69.7431"
              y2="15.3662"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" />
              <stop offset="1" stopColor="white" />
            </linearGradient>
            <text
              textAnchor="middle"
              x="18"
              y="24"
              style={{ fontWeight: "500", color: "white" }}
            >
              {cell
                .split(" ")
                .map((n) => n[0])
                .join(".")}
            </text>
          </SVGComponent>
          <br />
          <p style={{ color: "#7f7f7f" }}>{cell}</p>
        </div>
      ),
      sort: true,
    },
    {
      dataField: "id",
      text: "Product ID",
      align: "center",
      sort: true,
      hidden: true,
    },
    {
      dataField: "assignedDate",
      text: "Assigned Date",
      sort: true,
    },
    {
      dataField: "recievedDate",
      text: "Created Date",
      sort: true,
    },
    {
      dataField: "unitPrice",
      text: "Price (Rs)",
      formatter: (cell) => addCommas(JSON.stringify(cell)),
      sort: true,
    },
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
                  <CLabel>Type</CLabel>
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
                  <CLabel>Status</CLabel>
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
                  <CLabel>Assigned To</CLabel>
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
                {/* <CLabel>Assigned Date</CLabel> */}
                <br />
              </CCol>
              <CCol xs={3} style={{ marginTop: "25px" }}>
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
                  Add New File
                </CButton>
              </CCol>
            </CRow>
            <br />

            <BootstrapTable
              striped
              bootstrap4
              hover
              keyField="id"
              data={data}
              columns={columns}
              // selectRow={selectRow}
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

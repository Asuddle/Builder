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
import { useDispatch } from "react-redux";
import { handleApi } from "src/reusable/api";
import SelectInput from "src/reusable/select";
import AsyncSelect from "src/reusable/asyncSelect";
import TextFieldComponent from "src/reusable/textfield";

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
  const [fileType, setFileType] = useState("");
  const [status, setStatus] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [fileNo, setFileNo] = useState("");
  const [fileSecurityNo, setFileSecurityNo] = useState("");
  const [query, setQueryStr] = useState("");
  const [assignedDate, setAssignedDate] = useState("");
  // value={assignedDate}
  //                 onChange={(e) => setAssignedDate(e.target.value)}
  useEffect(() => {
    handleApi("get", `/plot-files/paginated?_limit=500&${query}`).then(
      (res) => {
        setData(res.data.data);
      }
    );
  }, [refresh, query]);
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
          <CCardHeader>
            <strong>Files</strong>
          </CCardHeader>
          <CCardBody>
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
            <br />
            <br />
            <CRow>
              <CCol sm={4}>
                <TextFieldComponent
                  handleChange={(e) => setFileNo(e.target.value)}
                  name="fileNo"
                  value={fileNo}
                  label={"File number"}
                />
              </CCol>
              <CCol xs={5}>
                <CLabel htmlFor="assigned_to">Assignment Date</CLabel>
                {/* <DateRangePicker> */}
                <input
                  type="date"
                  value={assignedDate}
                  onChange={(e) => setAssignedDate(e.target.value)}
                  name="assignedDate"
                  className="form-control"
                />
              </CCol>
              <CCol xs={3}>
                <CFormGroup>
                  <CLabel htmlFor="ccmonth">Type</CLabel>
                  <SelectInput
                    handleBlur={() => {}}
                    touched={""}
                    options={[
                      {
                        value: "5 Marla",
                        label: "5 Marla",
                      },
                      {
                        value: "10 Marla",
                        label: "10 Marla",
                      },
                      {
                        value: "15 Marla",
                        label: "15 Marla",
                      },
                    ]}
                    value={fileType}
                    setValue={(val, val1) => setFileType(val1)}
                    name="fileType"
                  />
                </CFormGroup>
              </CCol>
              <CCol sm={4}>
                <TextFieldComponent
                  handleChange={(e) => setFileSecurityNo(e.target.value)}
                  name="fileSecurityNo"
                  value={fileSecurityNo}
                  label={"Security Number"}
                />
              </CCol>
              <CCol xs={4}>
                <CFormGroup>
                  <CLabel>Assigned To</CLabel>
                  <AsyncSelect
                    touched={""}
                    handleBlur={() => {}}
                    value={assignedTo}
                    setValue={(val, val1) => setAssignedTo(val1)}
                    name="assignedTo"
                    url={"admin"}
                    noSameValue={true}
                  />
                </CFormGroup>
              </CCol>
              <CCol xs={3}>
                <CFormGroup>
                  <CLabel htmlFor="status">Status</CLabel>
                  <SelectInput
                    touched={""}
                    handleBlur={() => {}}
                    value={status}
                    setValue={(val, val1) => setStatus(val1)}
                    options={[
                      {
                        value: "Available",
                        label: "Available",
                      },
                      {
                        value: "Sold",
                        label: "Sold",
                      },
                      {
                        value: "Reserved",
                        label: "Reserved",
                      },
                    ]}
                    name="status"
                  />
                </CFormGroup>
              </CCol>
              <CCol xs={12}>
                <CButton
                  style={{
                    marginRight: "20px",
                    float: "right",
                  }}
                  onClick={() => {
                    let qString = "";
                    let arr = [
                      { label: "fileType", value: fileType },
                      { label: "status", value: status },
                      { label: "assignedTo", value: assignedTo },
                      { value: fileNo, label: "fileNo" },
                      { value: fileSecurityNo, label: "fileSecurityNo" },
                      { value: assignedDate, label: "assignedDate" },
                    ];
                    arr.map((item) => {
                      if (item.value !== "") {
                        qString = qString + `${item.label}=${item.value}`;
                      }
                    });
                    setQueryStr(qString);
                  }}
                  color="secondary"
                  size="md"
                >
                  Filter
                </CButton>
                <CButton
                  style={{
                    marginRight: "20px",
                    float: "right",
                  }}
                  onClick={() => {
                    setFileType("");
                    setStatus("");
                    setAssignedTo("");
                    setFileNo("");
                    setFileSecurityNo("");
                    setAssignedTo("");
                    setQueryStr("");
                  }}
                  color="secondary"
                  size="md"
                >
                  Reset Filter
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

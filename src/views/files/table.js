import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { cilTrash, cilPencil } from "@coreui/icons";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CPagination,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { ReactComponent as AddIcon } from "./svg/add.svg";
import usersData from "../users/UsersData";

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

const selectRow = {
  mode: "checkbox",
};
const FilesTable = ({ isEdit, isDelete }) => {
  const actionButtons = (cell, row) => (
    <>
      <CButton color="info" size="sm" onClick={() => isEdit(row)}>
        <CIcon content={cilPencil} />
      </CButton>{" "}
      <CButton color="danger" size="sm" onClick={() => isDelete(row)}>
        <CIcon content={cilTrash} />
      </CButton>
    </>
  );
  const columns = [
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
    {
      dataField: "project_name",
      text: "Project Name",
      sort: true,
    },
    {
      dataField: "assigned_date",
      text: "Assigned Date",
      sort: true,
    },

    {
      dataField: "unit_price",
      text: "Price",
      sort: true,
    },

    {
      dataField: "type",
      text: "Type",
    },
    {
      dataField: "status",
      text: "Status",
      formatter: getBadge,
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
              <CCol xs={9}></CCol>
              <CCol xs={3}>
                <CButton
                  style={{
                    paddingRight: "16px",
                    marginRight: "10px",
                  }}
                  color="primary"
                  size="lg"
                >
                  Transfer File
                </CButton>{" "}
                <CButton
                  style={{
                    paddingRight: "10px",
                  }}
                  onClick={() => {
                    history.push("/files/add");
                  }}
                  color="success"
                  size="lg"
                >
                  {/* <AddIcon />  */}
                  Add File
                </CButton>
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

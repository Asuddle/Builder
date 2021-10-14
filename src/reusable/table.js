import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import PropTypes from "prop-types";
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

import usersData from "src/views/users/UsersData";

    
function addCommas(str) {
  return str
    .replace(/^0+/, "")
    .replace(/\D/g, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
  var SVGComponent=(props)=><svg {...props}>{props.children}</svg>
  var CircleComponent=(props)=><circle {...props}>{props.children}</circle>
const defaultColumns = [
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
    headerStyle: (colum, colIndex) => {
      return { textAlign: "center" };
    },
    formatter:(cell,row)=><div style={{textAlign:'center'}}>
          <SVGComponent height="36" width='36'>
            <CircleComponent
            cx="18"
            cy='18'
            r='18'
            fill='#edcf82'
            stroke=''
            strokeWidth='4'
            />
            <linearGradient
            id='paint0_linear'
            x1='1.6'
            y1='9.48149'
            x2='69.7431'
            y2='15.3662'
            gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='white'/>
              <stop offset='1' stopColor='white'/>
            </linearGradient>
            <text
            textAnchor='middle'
            x='18'
            y='24'
            style={{fontWeight:'500',color:'white'}}
            >
            {cell.split(" ").map((n)=>n[0]).join(".")}
            </text>
            </SVGComponent>
            <br/>
          <p style={{color:"#7f7f7f"}}>{cell}</p>
    </div>,
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
    dataField: "assignment_date",
    text: "Assigned Date",
    sort: true,
  },
  {
    dataField: "received_date",
    text: "Created Date",
    sort: true,
  },
  {
    dataField: "price",
    text: "Price (Rs)",
    formatter: (cell) => addCommas(cell),
    sort: true,
  }
];
function TableComponent({title='Files',columns=defaultColumns,data=usersData}) {

  
  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>{title}</CCardHeader>
          <CCardBody>
            <BootstrapTable
              striped
              bootstrap4
              hover
              keyField="id"
              data={data}
              columns={columns}
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
}

TableComponent.propTypes = {};

export default TableComponent;

import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { cilTrash, cilPencil,cilFile } from "@coreui/icons";
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


function addCommas(str){
  return str.replace(/^0+/, '').replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const FilesTable = ({ isEdit, isDelete }) => {
  const [onSelectClick,setOnSelectClick]=useState([])
  
  const selectRow = {
    mode: "checkbox",
    onSelect:(data,isSelect, rowIndex, e)=>{
      if(isSelect){
        let arr=[...onSelectClick]
        arr.push(data)
        setOnSelectClick(arr)
      }else{
        let id=data.id
        let temp=[...onSelectClick]
          temp=temp.filter(item=>item.id!==id)
        setOnSelectClick(temp)
      }
    }
  };
  const actionButtons = (cell, row) => (
    <>
      <CButton color="info" size="sm" onClick={() => isEdit(row)} style={{padding: "3px 5px"}}>
        <CIcon content={cilPencil} />
      </CButton>{" "}
      <CButton color="danger" size="sm" onClick={() => isDelete(row)} style={{padding: "3px 5px"}}>
        <CIcon content={cilTrash} />
      </CButton>{"  "}
      <CButton color="success" size="sm" onClick={() => isDelete(row)} style={{padding: "3px 5px"}}>
        <CIcon content={cilFile} />
      </CButton>
    </>
  );
  const columns = [
    {
      dataField:'file_name',
      text:'File Number',
      sort:true,
      headerStyle: (colum, colIndex) => {
        return { textAlign:'center' };
      },
      formatter:(cell,row)=>(
        <>
        <p style={{margin:'0px',textAlign:'center'}}>{cell}</p>
        <hr style={{margin:'2px'}}/>
        <div className="subtitle" style={{textAlign:'center'}}>
        {row.status}  |   {row.type}
        </div>
        </>
      )
    },
    {
      dataField:'security_code',
      text:'Security Code',
      sort:true,
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
      dataField: "unit_price",
      text: "Price (Rs)",
      formatter:(cell)=>(
       addCommas(cell)        
      ),
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
              <CCol xs={9}></CCol>
              <CCol xs={3}>
              <CButton
                  style={{
                    marginRight: "20px",
                    float:'right'
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
                {!onSelectClick.length==0&&<CButton
                  style={{
                    paddingRight: "16px",
                    marginRight: "10px",
                  }}
                  color="secondary"
                  size="md"
                >
                  Transfer File
                </CButton>}{" "}
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

import React,{useState} from "react";
import PropTypes from "prop-types";
import TableComponent from "../../reusable/table";
import userDataArray from "./data";
import { useHistory } from "react-router";
import DeleteFileModal from '../files/delete-modal'
import goldBadge from "../files/svg/gold.svg";
import bronzeBadge from "../files/svg/bronze.svg";
import platinumBadge from "../files/svg/platinum.svg";
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
function UserList(props) {
  const history = useHistory();
  const [isDelete,setIsDelete]=useState(false)
  const handleClose=()=>{
    setIsDelete(false)
  }
  const actionButtons = (cell, row) => (
    <>
    {/* <CButton
        color="secondary"
        size="sm"
        onClick={() => {
        }}
        style={{ padding: "3px 5px" }}
      >
        <CIcon content={cilFile} />
      </CButton> */}
      {' '}
      <CButton
        color="info"
        size="sm"
        onClick={() => {history.push(`users/${row.id}/edit`)}}
        style={{ padding: "3px 5px" }}
      >
        <CIcon content={cilPencil} />
      </CButton>{" "}
      <CButton
        color="danger"
        size="sm"
        onClick={() => { setIsDelete(true)}}
        style={{ padding: "3px 5px" }}
      >
        <CIcon content={cilTrash} />
      </CButton>
      {"  "}
 
    </>
  );
  const columns = [
    {
      dataField: "badge",
      text: "Badge",
      formatter: (cell, row) => {
        return(<>
          {cell === "platinum" && <img src={platinumBadge} width="35" />}
          {cell == "gold" && <img src={goldBadge} width="35" />}
          {cell == "bronze" && <img src={bronzeBadge} width="35" />}
        </>);
      },
    },
    {
      dataField: "name",
      text: "Name",
      sort: true,
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
    },
    {
      dataField: "phone",
      text: "Phone",
      sort: true,
    },
    {
      dataField: "type",
      text: "Type",
      sort: true,
    },
    {
      dataField: "id",
      text: "Actions",
      formatter: actionButtons
    },
  ];
  
  return (
    <>
      <TableComponent
        addButton="Add New Users"
        callback={() => history.push("/users/add")}
        title="Users"
        columns={columns}
        data={userDataArray}
      />
      <DeleteFileModal open={isDelete} handleClose={handleClose} title='User'/>
    </>
  );
}

UserList.propTypes = {};

export default UserList;

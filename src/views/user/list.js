import React from "react";
import PropTypes from "prop-types";
import TableComponent from "../../reusable/table";
import userDataArray from "./data";

function UserList(props) {
  const columns = [
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
  ];
  return (
    <>
      <TableComponent title="Users" columns={columns} data={userDataArray} />
    </>
  );
}

UserList.propTypes = {};

export default UserList;

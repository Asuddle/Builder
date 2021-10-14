import React from "react";
import PropTypes from "prop-types";
import TableComponent from "../../reusable/table";
import userDataArray from "./data";
import { useHistory } from "react-router";

function UserList(props) {
  const history = useHistory();
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
      <TableComponent
        addButton="Add Users"
        callback={() => history.push("/users/add")}
        title="Users"
        columns={columns}
        data={userDataArray}
      />
    </>
  );
}

UserList.propTypes = {};

export default UserList;

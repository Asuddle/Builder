import React from "react";
import PropTypes from "prop-types";
import TableComponent from "../../reusable/table";
import userDataArray from "./data";
import { useHistory } from "react-router";
import goldBadge from "../files/svg/gold.svg";
import bronzeBadge from "../files/svg/bronze.svg";
import platinumBadge from "../files/svg/platinum.svg";
function UserList(props) {
  const history = useHistory();
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
    </>
  );
}

UserList.propTypes = {};

export default UserList;

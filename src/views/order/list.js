import React from "react";
import PropTypes from "prop-types";
import TableComponent from "src/reusable/table";
import orderDataArray from "./data";
import CIcon from "@coreui/icons-react";
import { cil3d, cilMoney } from "@coreui/icons";
import { useHistory } from "react-router";

function OrderListComponent(props) {
  const history=useHistory()
  const actionButtons = (cell, row) => (
    <>
      <CIcon
        content={cilMoney}
        width="20"
        style={{ cursor: "pointer" }}
        onClick={() => {
          history.push("/invoice");
        }}
      />
    </>
  );
  const columns = [
    {
      dataField: "id",
      text: "Order no",
      sort: true,
    },
    {
      dataField: "order_initiation_date",
      text: "Order Initiation Date",
      sort: true,
    },
    {
      dataField: "order_initiation_date",
      text: "Order Completion Date",
      sort: true,
    },
    // {
    //   dataField: "balance",
    //   text: "Deal Type",
    //   sort: true,
    // },
    {
      dataField: "type",
      text: "Initiated By",
      sort: true,
    },
    {
      dataField: "name",
      text: "Assigned To",
      sort: true,
    },
    {
      dataField: "assigned_to",
      text: "Received By",
      sort: true,
    },
    {
      dataField: "phone",
      text: "Project",
      sort: true,
    },
    {
      dataField: "id",
      text: "Actions",
      formatter: actionButtons,
    },
  ];

  return (
    <div>
      <TableComponent title="Orders" columns={columns} data={orderDataArray} />
    </div>
  );
}

OrderListComponent.propTypes = {};

export default OrderListComponent;

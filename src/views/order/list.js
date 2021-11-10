import React from "react";
import PropTypes from "prop-types";
import TableComponent from "src/reusable/table";
import orderDataArray from "./data";


function OrderListComponent(props) {
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
    {
      dataField: "balance",
      text: "Deal Type",
      sort: true,
    },
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
  ];

  return (
    <div>
      <TableComponent title="Orders" columns={columns} data={orderDataArray} />
    </div>
  );
}

OrderListComponent.propTypes = {};

export default OrderListComponent;

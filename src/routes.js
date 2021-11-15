import React from "react";

const AddFiles = React.lazy(() => import("./views/files/index"));
const FilesTable = React.lazy(() => import("./views/files/table-wrapper"));
const FilesTransfer = React.lazy(() => import("./views/files/transfer-file"));
const FileDetail = React.lazy(() => import("./views/files/details"));
const FileAssignment = React.lazy(() =>
  import("./views/files/file-assignment")
);
const FileHistory = React.lazy(() => import("./views/files/transfer-file"));
const FileNotes = React.lazy(() => import("./views/files/notes"));

const AddUser = React.lazy(() => import("./views/user/add"));
const EditUser = React.lazy(() => import("./views/user/add"));

const UserList = React.lazy(() => import("./views/user/list"));

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));

const OrdersList = React.lazy(() => import("./views/order/list"));

const Invoice = React.lazy(() => import("./views/invoice/index"));

const RolesPermissions = React.lazy(() => import("./views/role/index"));
const BulkFileTransfer = React.lazy(() =>
  import("./views/files/bulk-transfer")
);

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/files", exact: true, name: "Files", component: FilesTable },
  { path: "/files/add", exact: true, name: "Add", component: AddFiles },
  {
    path: "/files/transfer",
    exact: true,
    name: "Transfer",
    component: FilesTransfer,
  },
  {
    path: "/files/:id/details",
    exact: true,
    name: "Detail",
    component: FileDetail,
  },
  {
    path: "/files/bulk-transfer",
    exact: true,
    name: "Transfer",
    component: BulkFileTransfer,
  },
  {
    path: "/files/:id/details/notes",
    exact: true,
    name: "Notes",
    component: FileNotes,
  },
  {
    path: "/files/assignment",
    exact: true,
    name: "Assignment",
    component: FileAssignment,
  },
  {
    path: "/files/history",
    exact: true,
    name: "History",
    component: FileHistory,
  },

  { path: "/users", exact: true, name: "Users", component: UserList },
  { path: "/users/add", exact: true, name: "Add", component: AddUser },
  { path: "/users/:id/edit", exact: true, name: "Edit", component: EditUser },

  { path: "/roles", exact: true, name: "Roles", component: RolesPermissions },
  { path: "/orders", exact: true, name: "Orders", component: OrdersList },
  {
    path: "/permissions",
    exact: true,
    name: "Permissions",
    component: UserList,
  },
  { path: "/invoice", exact: true, name: "Invoice", component: Invoice },

  { path: "/dashboard", name: "Dashboard", component: Dashboard },
];

export default routes;

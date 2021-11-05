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

const Toaster = React.lazy(() =>
  import("./views/notifications/toaster/Toaster")
);
const Tables = React.lazy(() => import("./views/base/tables/Tables"));

const Breadcrumbs = React.lazy(() =>
  import("./views/base/breadcrumbs/Breadcrumbs")
);
const Cards = React.lazy(() => import("./views/base/cards/Cards"));
const Carousels = React.lazy(() => import("./views/base/carousels/Carousels"));
const Collapses = React.lazy(() => import("./views/base/collapses/Collapses"));
const BasicForms = React.lazy(() => import("./views/base/forms/BasicForms"));

const Jumbotrons = React.lazy(() =>
  import("./views/base/jumbotrons/Jumbotrons")
);
const ListGroups = React.lazy(() =>
  import("./views/base/list-groups/ListGroups")
);
const Navbars = React.lazy(() => import("./views/base/navbars/Navbars"));
const Navs = React.lazy(() => import("./views/base/navs/Navs"));
const Paginations = React.lazy(() =>
  import("./views/base/paginations/Pagnations")
);
const Popovers = React.lazy(() => import("./views/base/popovers/Popovers"));
const ProgressBar = React.lazy(() =>
  import("./views/base/progress-bar/ProgressBar")
);

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));



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

  { path: "/roles", exact: true, name: "Roles", component: UserList },
  {
    path: "/permissions",
    exact: true,
    name: "Permissions",
    component: UserList,
  },

  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  // { path: "/theme", name: "Theme", component: Colors, exact: true },
  // { path: "/theme/colors", name: "Colors", component: Colors },
  // { path: "/theme/typography", name: "Typography", component: Typography },
];

export default routes;

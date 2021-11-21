import React, { useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CLabel,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTabPane,
  CTabs,
  CCol,
} from "@coreui/react";
import AsyncSelect from "src/reusable/asyncSelect";

function RolePermissionComponent(props) {
  const [user, setUser] = useState("");
  const handleGetData = (val) => {
    setUser(val);
  };
  console.log("value here", user);
  return (
    <div>
      <CCard>
        <CCardHeader>
          <strong>Roles & Permissions</strong>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol xs={4}>
              <CLabel>
                <strong>Select User Type </strong>{" "}
              </CLabel>
              <AsyncSelect
                touched={""}
                handleBlur={() => {}}
                error={""}
                value={user}
                setValue={setUser}
                getAllData={handleGetData}
                name="user"
                url={"admin"}
              />
            </CCol>
            <CCol>
              <CLabel>
                <strong>Search User</strong>{" "}
              </CLabel>
              <AsyncSelect
                touched={""}
                handleBlur={() => {}}
                error={""}
                value={user}
                setValue={setUser}
                name="user"
                url={"admin"}
              />
            </CCol>
          </CRow>
          <table className="table table-striped table-hover">
            <tbody></tbody>
          </table>
        </CCardBody>
      </CCard>
    </div>
  );
}

export default RolePermissionComponent;

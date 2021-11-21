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
        </CCardBody>
        <div></div>
      </CCard>
    </div>
  );
}

export default RolePermissionComponent;
{
  /* <CTabs activeTab="home">
        <CNav variant="tabs">
          <CNavItem>
            <CNavLink data-tab="home">Roles</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink data-tab="profile">Permissions</CNavLink>
          </CNavItem>
        </CNav>
        <CTabContent>
          <CCard>
            <CTabPane data-tab="home">123</CTabPane>
            <CTabPane data-tab="profile">456</CTabPane>
          </CCard>
        </CTabContent>
      </CTabs> */
}

import React from "react";
import {
  CCard,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CTabs,
} from "@coreui/react";

function RolePermissionComponent(props) {
  return (
    <div>
      <CTabs activeTab="home">
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
      </CTabs>
    </div>
  );
}

export default RolePermissionComponent;

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
import SelectInput from "src/reusable/select";

function RolePermissionComponent(props) {
  const [user, setUser] = useState("");
  const [userType, setUserType] = useState("admin");
  const [detailData, setDetailData] = useState({});
  const [finalData, setFinalData] = useState({});
  const handleGetData = (val) => {
    setDetailData(val);
  };
  const handleUser = (val, val1) => {
    setUser(val1);

    const temp = detailData.filter((item) => item.id == val1);
    setFinalData(temp[0]);
  };
  let accountRegistrationArray = [
    "End User's Registration",
    "Empoyee's Registration",
    "Dealer's Registration",
  ];
  let inventoryManagmentArray = [
    "Single File Addition",
    "Bulk File Addition",
    "File Update (except price)",
    "File Update (with price)",
    "File Deletion",
    "Single File Transfer",
    "Bulk File transfer",
    "Single File View",
    "Files Grid View (assigned to login user)",
    "Files Grid View (assigned to any user)",
    "Assigned history (performed by login user)",
    "Assigned history (performed by any user)",
  ];
  let userDataArr = [
    { label: "Name", name: "name" },
    { label: "CNIC", name: "CNIC" },
    { label: "Email", name: "email" },
    { label: "Phone Number", name: "phoneNo" },
    { label: "Security Code", name: "securityCode" },
  ];
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
              <SelectInput
                handleBlur={() => {}}
                touched={""}
                options={[
                  { value: "admin", label: "Admin" },
                  { value: "dealer", label: "Dealer" },
                  { value: "endUser", label: "End User" },
                ]}
                value={userType}
                setValue={(val1, type) => setUserType(type)}
                name="fileType"
              />
              {/* <AsyncSelect
                touched={""}
                handleBlur={() => {}}
                error={""}
                value={user}
                name="user"
                url={"admin"}
              /> */}
            </CCol>
            <CCol>
              <CLabel>
                <strong>Search User</strong>{" "}
              </CLabel>
              {(userType == "admin" || userType == "endUser") && (
                <AsyncSelect
                  touched={""}
                  handleBlur={() => {}}
                  error={""}
                  value={user}
                  defaultVal={user}
                  getAllData={handleGetData}
                  setValue={handleUser}
                  name="user"
                  url={"admin"}
                />
              )}
              {userType == "dealer" && (
                <AsyncSelect
                  touched={""}
                  handleBlur={() => {}}
                  error={""}
                  defaultVal={user}
                  value={user}
                  getAllData={handleGetData}
                  setValue={handleUser}
                  name="user"
                  url={"dealer"}
                />
              )}
            </CCol>
          </CRow>
          <br />

          {Object.entries(finalData).length > 0 && (
            <>
              <table className="table  table-hover">
                <h4>Basic Information</h4>
                {userDataArr.map((item, index) => (
                  <tr key={index.toString()}>
                    <td>{item.label}</td>
                    <td>
                      <strong>{finalData[item.name]}</strong>
                    </td>
                  </tr>
                ))}
              </table>
              <table className="table table-striped table-hover">
                <tbody>
                  <h4>Account Registration</h4>
                  {accountRegistrationArray.map((item, index) => (
                    <tr key={index.toString()}>
                      <td>{item}</td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          defaultChecked
                          value=""
                          id="flexCheckDefault"
                        />
                      </td>
                    </tr>
                  ))}
                  <br />
                  <br />
                  <h4>Inventory Managment </h4>
                  {inventoryManagmentArray.map((item, index) => (
                    <tr key={index.toString()}>
                      <td>{item}</td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          defaultChecked
                          value=""
                          id="flexCheckDefault"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </CCardBody>
      </CCard>
    </div>
  );
}

export default RolePermissionComponent;

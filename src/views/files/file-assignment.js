import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CFormGroup,
  CInput,
  CLabel,
  CInvalidFeedback,
  CSelect,
  CSwitch,
  CInputRadio,
  CCardTitle,
  CCollapse,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import { ToastContainer, toast } from "react-toastify";
import { Field, Formik } from "formik";
import * as yup from "yup";
import TextFieldComponent from "src/reusable/textfield";
import DateRangePicker from "react-bootstrap-daterangepicker";
import SelectInput from "src/reusable/select";
import AlFursanBanner from "./alfursan-banner";
import CustomSwitch from "./switch";
import TableComponent from "src/reusable/table";
import FileLongForm from "./longform";
import { roundToNearestMinutes } from "date-fns/esm";
import PricingComponent from "./pricing";
import { useHistory } from "react-router";
import AsyncSelect from "src/reusable/asyncSelect";
import { handleApi } from "src/reusable/api";
function FileAssignment({
  data,
  col = 12,
  handleSubmit = () => {},
  handleClose,
  hideForm = false,
}) {
  const history = useHistory();
  const [showClass, setShowClass] = useState("");
  const [filter, setFilter] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [total, setTotal] = useState(0);
  const [assignmentForm, setAssignmentForm] = useState({});
  const [isPricingForm, setIsPricingForm] = useState(false);
  return (
    <div>
      <CCollapse show={filter}>
        {filter && (
          <CCol xs="12" sm={12}>
            <Formik
              initialValues={{
                fileNo: "",
                fileSecurityNo: "",
                fileType: "",
                projectName: "",
                status: "Available",
              }}
              onSubmit={(values) => {
                let qString = "";
                for (const key in values) {
                  if (values[key] !== "") {
                    qString = qString + `${key}=${values[key]}&`;
                  }
                }
                console.log("values", qString);
                handleApi("get", `/plot-files/paginated?${qString}`).then(
                  (res) => {
                    console.log("here is the response", res.data);
                    setTableData(res.data.data);
                    setTotal(res.data.total);

                    setShowClass(true);
                    setFilter(false);
                  }
                );
              }}
            >
              {({
                errors,
                touched,
                handleSubmit,
                handleChange,
                values,
                setFieldValue,
                setFieldTouched,
              }) => (
                <div id="seconddiv">
                  <CCard>
                    <CCardHeader>
                      <strong>Filter Files</strong>
                    </CCardHeader>
                    <form onSubmit={handleSubmit}>
                      <CCardBody>
                        <CRow>
                          <CCol sm={6}>
                            <CLabel htmlFor="assigned_to">
                              Assignment Date
                            </CLabel>
                            {/* <DateRangePicker> */}
                            <input
                              type="date"
                              name="assignedDate"
                              className="form-control"
                              onChange={handleChange}
                            />
                            {/* </DateRangePicker> */}
                            <br />
                          </CCol>

                          <CCol sm={6}>
                            <CLabel htmlFor="assigned_to">Received Date</CLabel>
                            {/* <DateRangePicker> */}
                            <input
                              type="date"
                              name="recievedDate"
                              className="form-control"
                              onChange={handleChange}
                            />
                            {/* </DateRangePicker> */}
                            <br />
                          </CCol>
                          <CCol sm={4}>
                            <TextFieldComponent
                              handleChange={handleChange}
                              name="fileNo"
                              touched={touched["fileNo"]}
                              error={errors["fileNo"]}
                              value={values["fileNo"]}
                              label={"File number"}
                            />
                          </CCol>
                          <CCol sm={3}>
                            <TextFieldComponent
                              handleChange={handleChange}
                              name="fileSecurityNo"
                              touched={touched["fileSecurityNo"]}
                              error={errors["fileSecurityNo"]}
                              value={values["fileSecurityNo"]}
                              label={"Security code"}
                            />
                          </CCol>
                          <CCol sm={4}>
                            <CFormGroup>
                              <CLabel htmlFor="ccmonth">Type</CLabel>
                              <SelectInput
                                handleBlur={setFieldTouched}
                                touched={touched["fileType"]}
                                error={errors["fileType"]}
                                options={[
                                  {
                                    value: "5 Marla",
                                    label: "5 Marla",
                                  },
                                  {
                                    value: "10 Marla",
                                    label: "10 Marla",
                                  },
                                  {
                                    value: "15 Marla",
                                    label: "15 Marla",
                                  },
                                ]}
                                value={values["fileType"]}
                                setValue={setFieldValue}
                                name="fileType"
                              />
                            </CFormGroup>
                          </CCol>
                          <CCol sm={3}>
                            <CFormGroup>
                              <CLabel htmlFor="street">Project Name</CLabel>
                              <SelectInput
                                creatable={true}
                                options={[
                                  {
                                    value: "Bahria",
                                    label: "Bahria",
                                  },
                                  {
                                    value: "DHA",
                                    label: "DHA",
                                  },
                                ]}
                                touched={touched["type"]}
                                handleBlur={setFieldTouched}
                                value={values["projectName"]}
                                setValue={setFieldValue}
                                name="projectName"
                              />
                            </CFormGroup>
                          </CCol>
                          <CCol sm={5}>
                            <CFormGroup>
                              <CLabel htmlFor="assignedTo">
                                Assigned To{" "}
                                <span className="sterick-field">*</span>
                              </CLabel>

                              <AsyncSelect
                                touched={touched["assignedTo"]}
                                handleBlur={setFieldTouched}
                                error={errors["assignedTo"]}
                                value={values["assignedTo"]}
                                setValue={setFieldValue}
                                name="assignedTo"
                                url={"admin"}
                                noSameValue={true}
                              />
                            </CFormGroup>
                          </CCol>
                          <CCol sm={4}>
                            <CFormGroup>
                              <CLabel htmlFor="recievedBy">
                                Received By{" "}
                                <span className="sterick-field">*</span>
                              </CLabel>
                              <AsyncSelect
                                touched={touched["recievedBy"]}
                                handleBlur={setFieldTouched}
                                error={errors["recievedBy"]}
                                value={values["recievedBy"]}
                                setValue={setFieldValue}
                                name="recievedBy"
                              />
                            </CFormGroup>
                          </CCol>
                          <CCol sm={3}>
                            <CFormGroup>
                              <CLabel htmlFor="status">Status</CLabel>
                              <SelectInput
                                touched={touched["status"]}
                                handleBlur={setFieldTouched}
                                error={errors["status"]}
                                value={values["status"]}
                                setValue={setFieldValue}
                                options={[
                                  {
                                    value: "Available",
                                    label: "Available",
                                  },
                                  {
                                    value: "Sold",
                                    label: "Sold",
                                  },
                                  {
                                    value: "Reserved",
                                    label: "Reserved",
                                  },
                                ]}
                                name="status"
                              />
                            </CFormGroup>
                          </CCol>
                        </CRow>
                      </CCardBody>
                      <CCardFooter>
                        <CButton type="submit" className="button-color">
                          Search
                        </CButton>
                        {"  "}
                        <CButton
                          style={{ marginRight: "12px" }}
                          type="submit"
                          className="button-color"
                          onClick={() => setFilter(!filter)}
                        >
                          Hide Filter
                        </CButton>
                      </CCardFooter>
                    </form>
                  </CCard>
                </div>
              )}
            </Formik>
          </CCol>
        )}
      </CCollapse>
      {!filter && (
        <CButton
          type="submit"
          className="button-color"
          onClick={() => setFilter(!filter)}
        >
          Filter
        </CButton>
      )}
      {showClass && (
        <>
          {tableData.length > 0 && (
            <TableComponent
              data={tableData}
              dataCount={true}
              exportCSV={true}
            />
          )}
          <CRow>
            <CCol xs="1"></CCol>
            <CCol xs={10}>
              {!isPricingForm && (
                <CCard>
                  {!hideForm && (
                    <FileLongForm
                      hideBasicInfo={true}
                      data={{
                        fileNo: "",
                        fileSecurityNo: "",
                        fileType: "",
                        projectName: "",
                        status: "Sold",
                        assigned_to: "",
                        assignedDate: new Date().toISOString().split("T")[0],
                        recievedBy: "",
                        recievedDate: new Date().toISOString().split("T")[0],
                        ...assignmentForm,
                      }}
                      handleSubmit={(val) => {
                        // console.log("here is the value", val);
                        setAssignmentForm(val);
                        setIsPricingForm(true);
                      }}
                      customSchema={yup.object().shape({
                        assignedDate: yup.string().required(),
                        recievedBy: yup.string().required(),
                        recievedDate: yup.string().required(),
                        assignedTo: yup.string().required(),
                      })}
                    />
                  )}
                </CCard>
              )}
              <CCard>
                {isPricingForm && (
                  <PricingComponent
                    handleBack={() => {
                      console.log("here check");
                      setIsPricingForm(false);
                    }}
                    customSubmit={(val) => {
                      console.log("here are some values", val);
                      history.push("/invoice");
                    }}
                    noCard={true}
                    data={{
                      form3: {
                        unitPrice: "100,000",
                        minimumRequiredDeposit: "10,000",
                        depositPercentage: "10",
                        total_price: "1,000,0000",
                        discount: "500,000",
                        depositDiscountPercentage: "5",
                        payable: "950,000",
                        note: "Hey There It is a note",
                      },
                    }}
                  />
                )}
              </CCard>
            </CCol>

            <CCol xs="1"></CCol>
          </CRow>
        </>
      )}
    </div>
  );
}

FileAssignment.propTypes = {};

export default FileAssignment;

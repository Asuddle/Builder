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

import { Field, Formik } from "formik";
import * as yup from "yup";
import TextFieldComponent from "src/reusable/textfield";
import DateRangePicker from "react-bootstrap-daterangepicker";
import SelectInput from "src/reusable/select";
import AlFursanBanner from "./alfursan-banner";
import CustomSwitch from "./switch";
import TableComponent from "src/reusable/table";
import FileLongForm from "./longform";
function FileAssignment({
  data,
  col = 12,
  handleSubmit = () => {},
  handleClose,
}) {
  const [showClass, setShowClass] = useState("");
  const [filter, setFilter] = useState(true);
  const [isAlfursan, setIsAlFursan] = useState(true);
  return (
    <div>
      <CCollapse show={filter}>
        {filter && (
          <CCol xs="12" sm={12}>
            <Formik
              initialValues={{
                file_name: "",
                security_code: "",
                type: "",
                project_name: "",
                status: "Available",
              }}
              onSubmit={(values) => {
                handleSubmit(values);
                setShowClass(true);
                setFilter(false);
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
                            <DateRangePicker>
                              <input type="text" className="form-control " />
                            </DateRangePicker>
                            <br />
                          </CCol>

                          <CCol sm={6}>
                            <CLabel htmlFor="assigned_to">Received Date</CLabel>
                            <DateRangePicker>
                              <input type="text" className="form-control " />
                            </DateRangePicker>
                            <br />
                          </CCol>
                          <CCol sm={4}>
                            <TextFieldComponent
                              handleChange={handleChange}
                              name="file_name"
                              touched={touched["file_name"]}
                              error={errors["file_name"]}
                              value={values["file_name"]}
                              label={"File number"}
                            />
                          </CCol>
                          <CCol sm={3}>
                            <TextFieldComponent
                              handleChange={handleChange}
                              name="security_code"
                              touched={touched["security_code"]}
                              error={errors["security_code"]}
                              value={values["security_code"]}
                              label={"Security code"}
                            />
                          </CCol>
                          <CCol sm={4}>
                            <CFormGroup>
                              <CLabel htmlFor="ccmonth">Type</CLabel>
                              <SelectInput
                                handleBlur={setFieldTouched}
                                touched={touched["type"]}
                                error={errors["type"]}
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
                                value={values["type"]}
                                setValue={setFieldValue}
                                name="type"
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
                                value={values["project_name"]}
                                setValue={setFieldValue}
                                name="project_name"
                              />
                            </CFormGroup>
                          </CCol>
                          <CCol sm={3}>
                            <CFormGroup>
                              <CLabel htmlFor="assigned_to">Assigned To</CLabel>
                              <SelectInput
                                touched={touched["assigned_to"]}
                                handleBlur={setFieldTouched}
                                error={errors["assigned_to"]}
                                value={values["assigned_to"]}
                                setValue={setFieldValue}
                                customHandleChange={(e) => {
                                  setFieldValue("assigned_to", e.value);
                                  if (isAlfursan) {
                                    setFieldValue("received_by", e.value);
                                  }
                                }}
                                options={
                                  isAlfursan
                                    ? [
                                        {
                                          value: "Ali",
                                          label: "Ali",
                                        },
                                        {
                                          value: "Usman",
                                          label: "Usman",
                                        },
                                        {
                                          value: "Daniel",
                                          label: "Daniel",
                                        },
                                        {
                                          value: "Sam",
                                          label: "Sam",
                                        },
                                      ]
                                    : [
                                        {
                                          value: "Dealer 1",
                                          label: "Dealer 1",
                                        },
                                        {
                                          value: "Dealer 2",
                                          label: "Dealer 2",
                                        },
                                        {
                                          value: "Dealer 3",
                                          label: "Dealer 3",
                                        },
                                        {
                                          value: "Dealer 4",
                                          label: "Dealer 4",
                                        },
                                      ]
                                }
                                name="assigned_to"
                              />
                            </CFormGroup>
                          </CCol>
                          <CCol sm={4}>
                            <CFormGroup>
                              <CLabel htmlFor="received_by">Received By</CLabel>
                              <SelectInput
                                touched={touched["received_by"]}
                                handleBlur={setFieldTouched}
                                value={values["received_by"]}
                                setValue={setFieldValue}
                                options={[
                                  {
                                    value: "Ali",
                                    label: "Ali",
                                  },
                                  {
                                    value: "Usman",
                                    label: "Usman",
                                  },
                                  {
                                    value: "Daniel",
                                    label: "Daniel",
                                  },
                                  {
                                    value: "Sam",
                                    label: "Sam",
                                  },
                                ]}
                                customHandleChange={(e) => {
                                  if (e.value === "") {
                                    setFieldValue("assigned_to", "");
                                  } else {
                                    setFieldValue("received_by", e.value);
                                    // handleChange(e);
                                  }
                                }}
                                name="received_by"
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
                        <CButton
                          type="submit"
                          className="button-color"
                          onClick={() => {
                            setShowClass(true);
                            setFilter(!filter);
                          }}
                        >
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
          <TableComponent />
          <CCard>
          <FileLongForm
            data={{
              file_name: "",
              security_code: "",
              type: "",
              project_name: "",
              status: "Sold",
              assigned_to: "",
              assignment_date: new Date().toISOString().split("T")[0],
              received_by: "",
              received_date: new Date().toISOString().split("T")[0],
            }}
          />
          </CCard>
        </>
      )}
    </div>
  );
}

FileAssignment.propTypes = {};

export default FileAssignment;

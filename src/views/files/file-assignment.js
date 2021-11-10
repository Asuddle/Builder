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
function FileAssignment({
  data,
  col = 12,
  handleSubmit = () => {},
  handleClose,
  hideForm = false,
}) {
  const history=useHistory()
  const [showClass, setShowClass] = useState("");
  const [filter, setFilter] = useState(true);
  const [isAlfursan, setIsAlFursan] = useState(true);
  const [assignmentForm, setAssignmentForm] = useState({});
  const [isPricingForm, setIsPricingForm] = useState(false);
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
          <TableComponent dataCount={true} exportCSV={true} />

          <CRow>
            <CCol xs="1"></CCol>
            <CCol xs={10}>
              {!isPricingForm && (
                <CCard>
                  {!hideForm && (
                    <FileLongForm
                      hideBasicInfo={true}
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
                        ...assignmentForm,
                      }}
                      handleSubmit={(val) => {
                        setAssignmentForm(val);
                        setIsPricingForm(true);
                      }}
                      customSchema={yup.object().shape({
                        assignment_date: yup.string().required(),
                        received_by: yup.string().required(),
                        received_date: yup.string().required(),
                        assigned_to: yup.string().required(),
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
                      // toast.success("The files are transferred successfully", {
                      //   position: "top-right",
                      //   autoClose: 3000,
                      //   hideProgressBar: false,
                      //   closeOnClick: true,
                      //   pauseOnHover: true,
                      //   draggable: true,
                      //   progress: undefined,
                      // });
                      history.push("/invoice");
                    }}
                    noCard={true}
                    data={{
                      form3: {
                        price: "100,000",
                        deposit: "10,000",
                        deposit_percentage: "10",
                        total_price: "1,000,0000",
                        discount: "500,000",
                        discount_percentage: "5",
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

import React, { useState } from "react";
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
  CSwitch,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { Formik } from "formik";
import logo from "../../assets/icons/alfursanlog.png";
import * as yup from "yup";
const AddInitialAssignment = ({ handleFormData, data, col = 6 }) => {
  const [receivingSwitch, setReceivingSwitch] = useState(true);
  let schema = yup.object().shape({
    assignment_date: yup.string().required(),
    received_by: yup.string().required(),
    received_date: yup.string().required(),
    assigned_to: yup.string().required(),
  });
  return (
    <>
      <CCol xs="12" sm={col}>
        <CCard className="m-4 p-4" className="form-shadow">
          <CCardHeader>
            <strong>Initial Assignment</strong>
          </CCardHeader>
          <Formik
            initialValues={data.form2}
            validationSchema={schema}
            onSubmit={(values) => {
              handleFormData(values, 2);
            }}
          >
            {({
              errors,
              touched,
              handleSubmit,
              handleChange,
              values,
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                <CCardBody>
                  <div style={{ textAlign: "center" }}>
                    <img src={logo} width={100} height={100} />
                  </div>
                  <br />
                  <CCard
                    style={{
                      padding: "6px",
                      boxShadow: "#edcf82 5px 5px",
                    }}
                  >
                    <CRow>
                      <CCol>
                        <img
                          style={{ float: "right" }}
                          src={logo}
                          width={70}
                          height={70}
                        />
                      </CCol>
                      <CCol xs={9}>
                        {/* <CLabel htmlFor="street">Company </CLabel>*/}
                        <h2 style={{ paddingTop: "15px" }}>
                          Al-Fursan Properties
                        </h2>
                        <p className="subtitle">
                          The Ultimate Insider's Guide to City Real Estate
                        </p>
                      </CCol>
                    </CRow>
                  </CCard>
                  <CCard
                    style={{
                      boxShadow:
                        "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
                    }}
                  >
                    <CCardHeader>
                      <strong>Company</strong>
                    </CCardHeader>
                    <CCardBody style={{ padding: "14px" }}>
                      <CRow>
                        <CCol xs={4}>
                          <img
                            src={logo}
                            style={{ float: "right" }}
                            width={60}
                            height={60}
                          />
                        </CCol>
                        <CCol xs={8}>
                          {/* <CLabel htmlFor="street">Company </CLabel>*/}
                          <h4 style={{ paddingTop: "5px" }}>
                            Al-Fursan Properties
                          </h4>
                          <p className="subtitle">
                            The Ultimate Insider's Guide to City Real Estate
                          </p>
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCard>
                  <br />
                  <CFormGroup>
                    <CLabel htmlFor="assigned_to">
                      Assigned To <span className="sterick-field">*</span>
                    </CLabel>
                    <CInput
                      invalid={touched["assigned_to"] && errors["assigned_to"]}
                      id="assigned_to"
                      name="assigned_to"
                      onChange={(e) => {
                        handleChange(e);
                        setFieldValue("received_by", e.target.value);
                      }}
                      value={values["assigned_to"]}
                      placeholder="123457"
                    />
                    {touched["assigned_to"] && errors["assigned_to"] && (
                      <CInvalidFeedback>
                        {errors["assigned_to"]}
                      </CInvalidFeedback>
                    )}
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="vat">Assignment Date </CLabel>
                    <CInput
                      invalid={
                        touched["assignment_date"] && errors["assignment_date"]
                      }
                      value={values["assignment_date"]}
                      name="assignment_date"
                      type="date"
                      id="vat"
                      onChange={handleChange}
                      placeholder="ABC12345XTZ"
                    />
                    {touched["assignment_date"] &&
                      errors["assignment_date"] && (
                        <CInvalidFeedback>
                          {errors["assignment_date"]}
                        </CInvalidFeedback>
                      )}
                  </CFormGroup>
                  <CFormGroup>
                    <CSwitch
                      className={"mx-1"}
                      variant={"3d"}
                      color={"primary"}
                      checked={receivingSwitch}
                      onChange={() => {
                        setReceivingSwitch(!receivingSwitch);
                      }}
                      size={"lg"}
                    />
                    <br />
                    <CLabel>
                      Please uncheck it if you want recieved date and recieving
                      person to be different
                    </CLabel>
                  </CFormGroup>
                  {!receivingSwitch && (
                    <>
                      <CFormGroup>
                        <CLabel htmlFor="street">
                          Received By <span className="sterick-field">*</span>
                        </CLabel>
                        <CInput
                          id="street"
                          value={values["received_by"]}
                          name="received_by"
                          onChange={handleChange}
                          invalid={
                            touched["received_by"] && errors["received_by"]
                          }
                          placeholder="Enter street name"
                        />
                        {touched["received_by"] && errors["received_by"] && (
                          <CInvalidFeedback>
                            {errors["received_by"]}
                          </CInvalidFeedback>
                        )}
                      </CFormGroup>

                      <CFormGroup>
                        <CLabel htmlFor="vat">
                          Receiving Date{" "}
                          <span className="sterick-field">*</span>
                        </CLabel>
                        <CInput
                          invalid={
                            touched["received_date"] && errors["received_date"]
                          }
                          value={values["received_date"]}
                          name="received_date"
                          onChange={handleChange}
                          type="date"
                          id="vat"
                          placeholder="ABC12345XTZ"
                        />
                        {touched["received_date"] &&
                          errors["received_date"] && (
                            <CInvalidFeedback>
                              {errors["received_date"]}
                            </CInvalidFeedback>
                          )}
                      </CFormGroup>
                    </>
                  )}
                </CCardBody>

                <CCardFooter>
                  <CButton
                    type="submit"
                    className="button-color"
                    onClick={handleSubmit}
                  >
                    Next <CIcon name="cil-arrow-right" width={16} />
                  </CButton>
                </CCardFooter>
              </form>
            )}
          </Formik>
        </CCard>
      </CCol>
    </>
  );
};

export default AddInitialAssignment;

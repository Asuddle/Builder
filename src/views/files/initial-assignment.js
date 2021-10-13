import React, { useState } from "react";
import {
  CButton,
  CSelect,
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
import SelectInput from "src/reusable/select";
import AlFursanBanner from "./alfursan-banner";
const AddInitialAssignment = ({ handleFormData, data, col = 6 }) => {
  const [receivingSwitch, setReceivingSwitch] = useState(true);
  let schema = yup.object().shape({
    assignment_date: yup
      .string()
      .required("Assignment date is a required field"),
    received_by: yup.string().required("Received by is a required field"),
    received_date: yup.string().required("Received date is a required field"),
    assigned_to: yup
      .string()
      .trim()
      .required("Assigned to is a required field"),
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
              setFieldTouched,
              values,
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                <CCardBody>
                  <AlFursanBanner />
                  <CFormGroup>
                    <CLabel htmlFor="assigned_to">
                      Assigned To <span className="sterick-field">*</span>
                    </CLabel>
                    <SelectInput
                      touched={touched["assigned_to"]}
                      handleBlur={setFieldTouched}
                      error={errors["assigned_to"]}
                      value={values["assigned_to"]}
                      setValue={setFieldValue}
                      customHandleChange={(e) => {
                        setFieldValue("assigned_to", e.value);
                        setFieldValue("received_by", e.value);
                      }}
                      options={[
                        { value: "Ali", label: "Ali" },
                        { value: "Usman", label: "Usman" },
                        { value: "Daniel", label: "Daniel" },
                        { value: "Sam", label: "Sam" },
                      ]}
                      name="assigned_to"
                    />
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
                        <CLabel htmlFor="received_by">
                          Received By <span className="sterick-field">*</span>
                        </CLabel>
                        <SelectInput
                          touched={touched["received_by"]}
                          handleBlur={setFieldTouched}
                          value={values["received_by"]}
                          setValue={setFieldValue}
                          options={[
                            { value: "Ali", label: "Ali" },
                            { value: "Usman", label: "Usman" },
                            { value: "Daniel", label: "Daniel" },
                            { value: "Sam", label: "Sam" },
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

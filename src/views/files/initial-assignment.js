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
import AsyncSelect from "src/reusable/asyncSelect";
const AddInitialAssignment = ({ handleFormData, data, col = 6 }) => {
  const [receivingSwitch, setReceivingSwitch] = useState(true);
  let schema = yup.object().shape({
    assignedDate: yup.string().required("Assignment date is a required field"),
    recievedBy: yup.string().required("Received by is a required field"),
    recievedDate: yup.string().required("Received date is a required field"),
    assignedTo: yup.string().trim().required("Assigned to is a required field"),
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
                    <CLabel htmlFor="assignedTo">
                      Assigned To <span className="sterick-field">*</span>
                    </CLabel>
                    <AsyncSelect
                      touched={touched["assignedTo"]}
                      handleBlur={setFieldTouched}
                      error={errors["assignedTo"]}
                      value={values["assignedTo"]}
                      setValue={setFieldValue}
                      name="assignedTo"
                    />
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="vat">Assignment Date </CLabel>
                    <CInput
                      invalid={
                        touched["assignedDate"] && errors["assignedDate"]
                      }
                      value={values["assignedDate"]}
                      name="assignedDate"
                      type="date"
                      id="vat"
                      onChange={(e) => {
                        setFieldValue("assignedDate", e.target.value);
                        setFieldValue("recievedDate", e.target.value);
                      }}
                      placeholder="ABC12345XTZ"
                    />
                    {touched["assignedDate"] && errors["assignedDate"] && (
                      <CInvalidFeedback>
                        {errors["assignedDate"]}
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
                        <CLabel htmlFor="recievedBy">
                          Received By <span className="sterick-field">*</span>
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

                      <CFormGroup>
                        <CLabel htmlFor="vat">
                          Receiving Date{" "}
                          <span className="sterick-field">*</span>
                        </CLabel>
                        <CInput
                          invalid={
                            touched["recievedDate"] && errors["recievedDate"]
                          }
                          value={values["recievedDate"]}
                          name="recievedDate"
                          onChange={handleChange}
                          type="date"
                          id="vat"
                          placeholder="ABC12345XTZ"
                        />
                        {touched["recievedDate"] && errors["recievedDate"] && (
                          <CInvalidFeedback>
                            {errors["recievedDate"]}
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

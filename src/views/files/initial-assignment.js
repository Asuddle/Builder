import React from "react";
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
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { Formik } from "formik";
import * as yup from "yup";

const AddInitialAssignment = ({ handleFormData, data }) => {
  let schema = yup.object().shape({
    assignment_date: yup.string().required(),
    received_by: yup.string().required(),
    received_date: yup.string().required(),
    company: yup.string().required(),
  });
  return (
    <>
      <CCol xs="12" sm="6">
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
            {({ errors, touched, handleSubmit, handleChange, values }) => (
              <form onSubmit={handleSubmit}>
                <CCardBody>
                  <CFormGroup>
                    <CLabel htmlFor="company">Assigned To </CLabel>
                    <CInput
                      invalid={touched["company"] && errors["company"]}
                      id="company"
                      name="company"
                      onChange={handleChange}
                      value={values["company"]}
                      placeholder="123457"
                    />
                    {touched["company"] && errors["company"] && (
                      <CInvalidFeedback>{errors["company"]}</CInvalidFeedback>
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
                    <CLabel htmlFor="street">Received By </CLabel>
                    <CInput
                      id="street"
                      value={values["received_by"]}
                      name="received_by"
                      onChange={handleChange}
                      invalid={touched["received_by"] && errors["received_by"]}
                      placeholder="Enter street name"
                    />
                    {touched["received_by"] && errors["received_by"] && (
                      <CInvalidFeedback>
                        {errors["received_by"]}
                      </CInvalidFeedback>
                    )}
                  </CFormGroup>

                  <CFormGroup>
                    <CLabel htmlFor="vat">Receiving Date </CLabel>
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
                    {touched["received_date"] && errors["received_date"] && (
                      <CInvalidFeedback>
                        {errors["received_date"]}
                      </CInvalidFeedback>
                    )}
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="street">Company </CLabel>
                    <h6>Al-Fursan Properties</h6>
                  </CFormGroup>
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

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
  CInputRadio,
  CLabel,
  CSelect,
  CInvalidFeedback,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { Field, Formik } from "formik";
import * as yup from "yup";
const AddFiles = ({ nextForm, data, handleFormData, col = 6 }) => {
  let schema = yup.object().shape({
    file_name: yup.string().required(),
    security_code: yup.string().required(),
    type: yup.string().required(),
  });

  return (
    <>
      <CCol xs="12" sm={col}>
        <CCard className="m-4 p-4" className="form-shadow">
          <CCardHeader>
            <strong>Basic Information</strong>
          </CCardHeader>
          <Formik
            initialValues={data.form1}
            validationSchema={schema}
            onSubmit={(values) => {
              handleFormData(values, 1);
            }}
          >
            {({ errors, touched, handleSubmit, handleChange, values }) => (
              <form onSubmit={handleSubmit}>
                <CCardBody>
                  <CFormGroup>
                    <CLabel htmlFor="company">
                      File number <span className="sterick-field">*</span>{" "}
                    </CLabel>
                    <CInput
                      invalid={touched["file_name"] && errors["file_name"]}
                      name="file_name"
                      id="company"
                      value={values["file_name"]}
                      onChange={handleChange}
                      placeholder="123457"
                    />

                    {touched["file_name"] && errors["file_name"] && (
                      <CInvalidFeedback>{errors["file_name"]}</CInvalidFeedback>
                    )}
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="vat">
                      Security Code <span className="sterick-field">*</span>{" "}
                    </CLabel>
                    <CInput
                      invalid={
                        touched["security_code"] && errors["security_code"]
                      }
                      value={values["security_code"]}
                      name="security_code"
                      onChange={handleChange}
                      id="vat"
                      placeholder="ABC12345XTZ"
                    />
                    {touched["security_code"] && errors["security_code"] && (
                      <CInvalidFeedback>
                        {errors["security_code"]}
                      </CInvalidFeedback>
                    )}
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="ccmonth">
                      Type <span className="sterick-field">*</span>
                    </CLabel>
                    <CSelect
                      name="type"
                      value={values["type"]}
                      invalid={touched["type"] && errors["type"]}
                      onChange={handleChange}
                      custom
                      name="type"
                      id="ccmonth"
                    >
                      <option value="Enter Type"></option>
                      <option value="5 Marla">5 Marla</option>
                      <option value="10 Marla">10 Marla</option>
                      <option value="15 Marla">15 Marla</option>
                      <option value="20 Marla">20 Marla</option>
                    </CSelect>
                    {touched["type"] && errors["type"] && (
                      <CInvalidFeedback>{errors["type"]}</CInvalidFeedback>
                    )}
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="12">
                      <CLabel>Status</CLabel>
                    </CCol>
                    <CCol md="11">
                      <CFormGroup variant="custom-radio" inline>
                        <CInputRadio
                          custom
                          id="inline-radio1"
                          name="inline-radios"
                          value="option1"
                        />
                        <CLabel
                          variant="custom-checkbox"
                          htmlFor="inline-radio1"
                        >
                          Sold
                        </CLabel>
                      </CFormGroup>
                      <CFormGroup variant="custom-radio" inline>
                        <CInputRadio
                          custom
                          color="primary"
                          id="inline-radio2"
                          name="inline-radios"
                          value="option2"
                        />
                        <CLabel
                          variant="custom-checkbox"
                          htmlFor="inline-radio2"
                        >
                          Reserved
                        </CLabel>
                      </CFormGroup>
                      <CFormGroup variant="custom-radio" inline>
                        <CInputRadio
                          custom
                          id="inline-radio3"
                          name="inline-radios"
                          value="option3"
                        />
                        <CLabel
                          variant="custom-checkbox"
                          htmlFor="inline-radio3"
                        >
                          Available
                        </CLabel>
                      </CFormGroup>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="street">Project Name</CLabel>
                    <CInput
                      onChange={handleChange}
                      name="project_name"
                      value={values["project_name"]}
                      id="street"
                      placeholder="DHA etc.."
                      invalid={
                        touched["project_name"] && errors["tproject_nameype"]
                      }
                    />
                    {touched["project_name"] && errors["project_name"] && (
                      <CInvalidFeedback>
                        {errors["project_name"]}
                      </CInvalidFeedback>
                    )}
                  </CFormGroup>
                </CCardBody>
                <CCardFooter>
                  <CButton
                    type="submit"
                    className="button-color"
                    //   onClick={handleFormSubmit}
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

export default AddFiles;

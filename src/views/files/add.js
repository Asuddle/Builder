import React from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CFormGroup,
  CInputRadio,
  CLabel,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { Field, Formik } from "formik";
import * as yup from "yup";
import SelectInput from "src/reusable/select";
import TextFieldComponent from "src/reusable/textfield";
const AddFiles = ({ nextForm, data, handleFormData, col = 6 }) => {
  let schema = yup.object().shape({
    fileNo: yup.string().required("File Number is a required field"),
    fileSecurityNo: yup.string().required("Security Code is a required field"),
    fileType: yup.string().required("Type is a required field"),
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
            validateOnBlur
            onSubmit={(values) => {
              handleFormData(values, 1);
            }}
          >
            {({
              errors,
              touched,
              handleSubmit,
              handleChange,
              values,
              setFieldValue,
              handleBlur,
              setFieldTouched,
            }) => (
              <form onSubmit={handleSubmit}>
                <CCardBody>
                  <TextFieldComponent
                    handleChange={handleChange}
                    name="fileNo"
                    touched={touched["fileNo"]}
                    error={errors["fileNo"]}
                    value={values["fileNo"]}
                    required={true}
                    label={"File number"}
                  />
                  <TextFieldComponent
                    handleChange={handleChange}
                    name="fileSecurityNo"
                    touched={touched["fileSecurityNo"]}
                    error={errors["fileSecurityNo"]}
                    value={values["fileSecurityNo"]}
                    required={true}
                    label={"Security code"}
                  />
                  <CFormGroup>
                    <CLabel htmlFor="ccmonth">
                      Type <span className="sterick-field">*</span>
                    </CLabel>
                    <SelectInput
                      handleBlur={setFieldTouched}
                      touched={touched["fileType"]}
                      error={errors["fileType"]}
                      options={[
                        { value: "5 Marla", label: "5 Marla" },
                        { value: "10 Marla", label: "10 Marla" },
                        { value: "15 Marla", label: "15 Marla" },
                      ]}
                      value={values["fileType"]}
                      setValue={setFieldValue}
                      name="fileType"
                    />
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
                          name="status"
                          onClick={() => {
                            setFieldValue("status", "Sold");
                          }}
                          checked={values["status"] === "Sold"}
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
                          name="status"
                          onClick={() => {
                            setFieldValue("status", "Reserved");
                          }}
                          checked={values["status"] === "Reserved"}
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
                          name="status"
                          onClick={() => {
                            setFieldValue("status", "Available");
                          }}
                          checked={values["status"] === "Available"}
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
                    <SelectInput
                      creatable={true}
                      options={[
                        { value: "Bahria", label: "Bahria" },
                        { value: "DHA", label: "DHA" },
                      ]}
                      touched={touched["fileType"]}
                      handleBlur={setFieldTouched}
                      value={values["projectName"]}
                      setValue={setFieldValue}
                      name="projectName"
                    />
                  </CFormGroup>
                </CCardBody>
                <CCardFooter>
                  <CButton type="submit" className="button-color">
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

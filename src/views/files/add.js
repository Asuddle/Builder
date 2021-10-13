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
import SelectInput from "src/reusable/select";
import TextFieldComponent from "src/reusable/textfield";
const AddFiles = ({ nextForm, data, handleFormData, col = 6 }) => {
  let schema = yup.object().shape({
    file_name: yup.string().required("File Number is a required field"),
    security_code: yup.string().required("Security Code is a required field"),
    type: yup.string().required("Type is a required field"),
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
              console.log('values here',values)
              handleFormData(values, 1);
            }}
          >
            {({ errors, touched, handleSubmit, handleChange, values,setFieldValue,handleBlur,setFieldTouched }) => (
              <form onSubmit={handleSubmit}>
                <CCardBody>
                  <TextFieldComponent
                    handleChange={handleChange}
                    name='file_name'
                    touched={touched['file_name']}
                    error={errors['file_name']}
                    value={values['file_name']}
                    required={true}
                    label={"File number"}
                  />
                  <TextFieldComponent
                    handleChange={handleChange}
                    name='security_code'
                    touched={touched['security_code']}
                    error={errors['security_code']}
                    value={values['security_code']}
                    required={true}
                    label={"Security code"}
                  />
                  <CFormGroup>
                    <CLabel htmlFor="ccmonth">
                      Type <span className="sterick-field">*</span>
                    </CLabel>
                    <SelectInput
                      handleBlur={setFieldTouched}
                      touched={touched['type']}
                      error={errors['type']}
                      options={[
                        { value: '5 Marla', label: '5 Marla' },
                        { value: '10 Marla', label: '10 Marla' },
                        { value: '15 Marla', label: '15 Marla' }
                      ]}
                      value={values['type']}
                      setValue={setFieldValue}
                      name='type'
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
                          onClick={()=>{setFieldValue('status','Sold')}}
                          checked={values['status']==='Sold'}
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
                          onClick={()=>{setFieldValue('status','Reserved')}}
                          checked={values['status']==='Reserved'}
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
                          onClick={()=>{setFieldValue('status','Available')}}
                          checked={values['status']==='Available'}
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
                        { value: 'Bahria', label: 'Bahria' },
                        { value: 'DHA', label: 'DHA' },
                      ]}
                      touched={touched['type']}
                      handleBlur={setFieldTouched}
                      value={values['project_name']}
                      setValue={setFieldValue}
                      name='project_name'
                    />
                  </CFormGroup>
                </CCardBody>
                <CCardFooter>
                  <CButton
                    type="submit"
                    className="button-color"
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

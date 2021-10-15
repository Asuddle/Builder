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
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { Field, Formik } from "formik";
import * as yup from "yup";
import TextFieldComponent from "src/reusable/textfield";
import SelectInput from "src/reusable/select";
import AlFursanBanner from "./alfursan-banner";
import CustomSwitch from "./switch";
function FileLongForm({
  data={},
  col = 12,
  handleSubmit = () => {},
  handleClose,
  hideBasicInfo=false
}) {
  const [receivingSwitch, setReceivingSwitch] = useState(true);
  const [initialState, setInitialState] = useState(data);

  let schema = yup.object().shape({
    file_name: yup.string().required("File Number is a required field"),
    security_code: yup.string().required("Security Code is a required field"),
    type: yup.string().required("Type is a required field"),
    assignment_date: yup.string().required(),
    received_by: yup.string().required(),
    received_date: yup.string().required(),
    assigned_to: yup.string().required(),
  });
  const [isAlfursan,setIsAlFursan]=useState(true)
  useEffect(() => {
    if (typeof data !== "undefined") {
      setInitialState(data);
    } else {
      setInitialState({});
    }
  }, [data]);

  const customChecked=(val)=>{
    setIsAlFursan(val)
  }
  return (
    <div>
      <CCol xs="12" sm={12}>
        {Object.entries(initialState).length > 0 && (
          <Formik
            initialValues={initialState}
            validationSchema={schema}
            onSubmit={(values) => {
              handleSubmit(values)
            }}
          >
            {({
              errors,
              touched,
              handleSubmit,
              handleChange,
              values,
              setFieldValue,
              setFieldTouched 
            }) => (
              <form onSubmit={handleSubmit}>
              {!hideBasicInfo&&<>    <CCardHeader>
                <strong>Basic Information</strong>
                </CCardHeader>
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
                      </>}
                      
                <CustomSwitch setState={customChecked} />
                      <CCardHeader>
                <strong>File Assignment</strong>
                </CCardHeader>
                <CCardBody>
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
                        if(isAlfursan){
                        setFieldValue("received_by", e.value);
                        }
                      }}
                      options={isAlfursan?[
                        { value: "Ali Khan", label: "Ali Khan" },
                        { value: "Usman", label: "Usman" },
                        { value: "Daniel", label: "Daniel" },
                        { value: "Sam", label: "Sam" },
                      ]:[
                        { value: "Dealer 1", label: "Dealer 1" },
                        { value: "Dealer 2", label: "Dealer 2" },
                        { value: "Dealer 3", label: "Dealer 3" },
                        { value: "Dealer 4", label: "Dealer 4" },  
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
                  <CButton type="submit" className="button-color">
                    Next <CIcon name="cil-arrow-right" width={16} />
                  </CButton>
                  
                  {!hideBasicInfo&&<CButton color='secondary'className='cancel-button-color' onClick={handleClose}>
                    Cancel
                  </CButton>}
                </CCardFooter>
              </form>
            )}
          </Formik>
        )}
      </CCol>
    </div>
  );
}

FileLongForm.propTypes = {};

export default FileLongForm;

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
const AddInitialAssignment = ({ handleFormData, data, col = 6 }) => {
  const [receivingSwitch, setReceivingSwitch] = useState(true);
  let schema = yup.object().shape({
    assignment_date: yup.string().required(),
    received_by: yup.string().required(),
    received_date: yup.string().required(),
    assigned_to: yup.string().trim().required(),
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
                  <CFormGroup>
                    <CLabel htmlFor="assigned_to">
                    Assigned To <span className="sterick-field">*</span>
                    </CLabel>
                    <CSelect
                      name="assigned_to"
                      value={values["assigned_to"]}
                      invalid={touched["assigned_to"] && errors["assigned_to"]}
                      onChange={(e)=>{  
                        console.log('vlue',e.target.value)
                          if(e.target.value===''){
                            setFieldValue('assigned_to','')
                          }else{
                            handleChange(e)
                            setFieldValue('received_by',e.target.value)
                          }
                      }}
                      custom
                      name="assigned_to"
                      id="assigned_to"
                    >
                      <option value="" disbled>Enter Assigned To</option>
                      <option value="5 Marla">Ali</option>
                      <option value="10 Marla">Usman</option>
                      <option value="15 Marla">Daniel</option>
                      <option value="20 Marla">Usman</option>
                    </CSelect>
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
                    <CLabel htmlFor="received_by">
                    Received By <span className="sterick-field">*</span>
                    </CLabel>
                    <CSelect
                      name="received_by"
                      value={values["received_by"]}
                      invalid={
                        touched["received_by"] && errors["received_by"]
                      }
                      invalid={touched["received_by"] && errors["received_by"]}
                      onChange={(e)=>{ 
                          if(e.target.value===''){
                            setFieldValue('assigned_to','')
                          }else{
                            handleChange(e)
                          }
                      }}
                      custom
                      id="assigned_to"
                    >
                      <option value="" disbled>Enter Received By</option>
                      <option value="5 Marla">Ali</option>
                      <option value="10 Marla">Usman</option>
                      <option value="15 Marla">Daniel</option>
                      <option value="20 Marla">Usman</option>
                    </CSelect>
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

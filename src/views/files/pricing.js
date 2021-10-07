import React from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CFormGroup,
  CInvalidFeedback,
  CInput,
  CLabel,
  CRow,
  CInputGroupAppend,
  CInputGroupText,
  CInputGroup,
} from "@coreui/react";
import { Formik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";

import { useHistory } from "react-router";
const PricingComponent = ({ data, handleFormData }) => {
  let schema = yup.object().shape({
    price: yup.number().required(),
    deposit: yup.number().required(),
    deposit_percentage: yup.number().max(100),
  });
  const history = useHistory();
  return (
    <>
      <CCol xs="12" sm="6">
        <CCard className="m-4 p-4" className="form-shadow">
          <CCardHeader>
            <strong>Pricing</strong>
            {/* <small> Form</small> */}
          </CCardHeader>
          <Formik
            initialValues={data.form3}
            validationSchema={schema}
            onSubmit={(values) => {
              handleFormData(values, 3);
              toast.success("The file is Added! ", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              setTimeout(() => {
                history.push("/files");
              }, 1000);
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
                  <CFormGroup>
                    <CLabel htmlFor="company">Unit Price </CLabel>
                    <CInput
                      invalid={touched["price"] && errors["price"]}
                      name="price"
                      onChange={(e) => {
                        if (
                          values["deposit"] !== "" ||
                          values["deposit_percentage"] !== ""
                        ) {
                          setFieldValue("deposit", "");
                          setFieldValue("deposit_percentage", "");
                        }
                        handleChange(e);
                      }}
                      value={values["price"]}
                      placeholder="123457"
                    />
                    {touched["price"] && errors["price"] && (
                      <CInvalidFeedback>{errors["price"]}</CInvalidFeedback>
                    )}
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="vat">Minimum deposit </CLabel>
                    <CRow>
                      <CCol>
                        <CInput
                          invalid={touched["deposit"] && errors["deposit"]}
                          onChange={(e) => {
                            if (values["price"] !== "") {
                              let perc =
                                (e.target.value * 100) / values["price"];
                              if (!Number.isInteger(perc)) {
                                perc = parseFloat(perc).toFixed(2);
                              }
                              // 23 % 1 = 0
                              // 23.5 % 1 = 0.5
                              // if (perc > 100) {
                              //   perc = 100;
                              // }
                              setFieldValue("deposit_percentage", perc);
                            }
                            handleChange(e);
                          }}
                          value={values["deposit"]}
                          name="deposit"
                          placeholder="Deposit"
                        />
                        {touched["deposit"] && errors["deposit"] && (
                          <CInvalidFeedback>
                            {errors["deposit"]}
                          </CInvalidFeedback>
                        )}
                      </CCol>
                      <CCol>
                        <CInputGroup>
                          <CInput
                            invalid={
                              touched["deposit_percentage"] &&
                              errors["deposit_percentage"]
                            }
                            onChange={(e) => {
                              if (e.target.value < 101) {
                                if (values["price"] !== "") {
                                  let perc =
                                    (e.target.value / 100) * values["price"];
                                  console.log("values", perc);
                                  setFieldValue("deposit", perc);
                                }
                                handleChange(e);
                              }
                            }}
                            value={values["deposit_percentage"]}
                            name="deposit_percentage"
                            placeholder="Percentage"
                          />
                          <CInputGroupAppend>
                            <CInputGroupText>%</CInputGroupText>
                          </CInputGroupAppend>
                          {touched["deposit_percentage"] &&
                            errors["deposit_percentage"] && (
                              <CInvalidFeedback>
                                {errors["deposit_percentage"]}
                              </CInvalidFeedback>
                            )}
                        </CInputGroup>
                      </CCol>
                    </CRow>
                  </CFormGroup>
                </CCardBody>
                <CCardFooter>
                  <CButton type="submit" className="button-color">
                    Submit
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

export default PricingComponent;

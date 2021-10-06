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
} from "@coreui/react";
import { Formik } from "formik";
import * as yup from "yup";
const PricingComponent = ({ data, handleFormData }) => {
  let schema = yup.object().shape({
    price: yup.number().required(),
  });
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
                          onChange={(e) => {
                            if (values["price"] !== "") {
                              let perc =
                                (e.target.value * 100) / values["price"];
                              setFieldValue("deposit_percentage", perc);
                            }
                            handleChange(e);
                          }}
                          value={values["deposit"]}
                          name="deposit"
                          placeholder="Deposit"
                        />
                      </CCol>
                      <CCol>
                        <CInput
                          onChange={(e) => {
                            if (values["price"] !== "") {
                              let perc =
                                (e.target.value / 100) * values["price"];
                              console.log("values", perc);
                              setFieldValue("deposit", perc);
                            }
                            handleChange(e);
                          }}
                          value={values["deposit_percentage"]}
                          name="deposit_percentage"
                          placeholder="Percentage"
                        />
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

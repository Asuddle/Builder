import React, { useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CFormGroup,
  CInputRadio,
  CInvalidFeedback,
  CInput,
  CLabel,
  CRow,
} from "@coreui/react";

import { cilChevronLeft, cilArrowLeft } from "@coreui/icons";
import goldBadge from "../files/svg/gold.svg";
import bronzeBadge from "../files/svg/bronze.svg";
import platinumBadge from "../files/svg/platinum.svg";
import CIcon from "@coreui/icons-react";
import { Formik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import TextFieldComponent from "../../reusable/textfield";
import SelectInput from "../../reusable/select";
import { useHistory } from "react-router";
const AddUsers = ({
  data,
  handleFormData,
  noCard = false,
  handleBack = () => {},
}) => {
  function generatePassword() {
    var length = 8,
      charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }
  const [typeField, setTypeField] = useState("End User");
  const [badge, setBadge] = useState("platinum");
  
  let schema = yup.object().shape({
    name: yup.string().required("Name is a required field").min(0),
    email: yup.string().when("type", {
      is: "End User",
      otherwise: yup.string().required("Email is a required field").email(),
    }),
    // yup.string().required("Email is a required field").email(),
    type: yup.string().required("Type is a required field"),
    password: yup.string().when("type", {
      is: "End User",
      otherwise: yup.string().required("Password is a required field"),
    }),
  });
  const history = useHistory();
  function removeCommas(str) {
    return str.replaceAll(",", "");
  }
  let Form = (
    <>
      {" "}
      <CCardHeader>
        <strong>Add User</strong>
        <div style={{ float: "right" }}>
          {badge==='platinum'&&<img src={platinumBadge} width="35" />}
          {badge=='gold'&&<img src={goldBadge} width="35" />}
          {badge=='bronze'&&<img src={bronzeBadge} width="35" />}
        </div>
        {/* <small> Form</small> */}
      </CCardHeader>
      <Formik
        initialValues={{
          name: "",
          email: "",
          phone: "",
          type: "",
          password: generatePassword(),
          badge:'platinum'
        }}
        validationSchema={schema}
        onSubmit={(values) => {
          //   handleFormData(values, 3);
          toast.success("New user is Added! ", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            history.push("/users");
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
          setFieldTouched,
        }) => (
          <form onSubmit={handleSubmit}>
            <CCardBody>
              <CRow>
                <CCol>
                  <CFormGroup>
                    <CLabel htmlFor="street">Type</CLabel>
                    <SelectInput
                      options={[
                        { value: "Employee", label: "Employee" },
                        { value: "Dealer", label: "Dealer" },
                        { value: "End User", label: "End User" },
                      ]}
                      touched={touched["type"]}
                      error={errors["type"]}
                      customHandleChange={(e) => {
                        setFieldValue("type", e.value);
                        setTypeField(e.value);
                      }}
                      handleBlur={setFieldTouched}
                      value={values["type"]}
                      setValue={setFieldValue}
                      name="type"
                    />
                  </CFormGroup>
                </CCol>
                <CCol xs="12">
                  <TextFieldComponent
                    handleChange={handleChange}
                    name="name"
                    touched={touched["name"]}
                    error={errors["name"]}
                    value={values["name"]}
                    required={true}
                    label={"Name"}
                  />
                </CCol>
                {typeField !== "End User" && (
                  <CCol xs="6">
                    <TextFieldComponent
                      handleChange={handleChange}
                      name="email"
                      touched={touched["email"]}
                      error={errors["email"]}
                      value={values["email"]}
                      required={true}
                      label={"Email"}
                    />
                  </CCol>
                )}
                {typeField !== "End User" && (
                  <CCol xs="6">
                    <TextFieldComponent
                      handleChange={handleChange}
                      name="password"
                      type="password"
                      touched={touched["password"]}
                      error={errors["password"]}
                      value={values["password"]}
                      required={true}
                      label={"Password"}
                    />
                  </CCol>
                )}
                <CCol xs="12">
                  <CFormGroup row>
                    <CCol md="12">
                      <CLabel>Badge</CLabel>
                    </CCol>
                    <CCol md="12">
                      <CRow>
                        <CCol xs='2'>
                      <CFormGroup variant="custom-radio" inline>
                        <CInputRadio
                          custom
                          id="inline-radio1"
                          name="badge"
                          onClick={() => {
                            setFieldValue("badge", "platinum");
                            setBadge('platinum')
                          }}
                          checked={values["badge"] === "platinum"}
                        />
                        <CLabel
                          variant="custom-checkbox"
                          htmlFor="inline-radio1"
                          style={{display:'grid',textAlign:'center'}}
                        >
                        <img src={platinumBadge} width="40" style={{marginLeft:'5px'}} />
                        <p>Platinum</p>
                        </CLabel>
                      </CFormGroup>
                      </CCol>
                      <CCol xs='2'>
                      <CFormGroup variant="custom-radio" inline>
                        <CInputRadio
                          custom
                          color="primary"
                          id="inline-radio2"
                          name="badge"
                          onClick={() => {
                            setFieldValue("badge", "gold");
                            setBadge('gold')
                          }}
                          checked={values["badge"] === "gold"}
                        />
                        <CLabel
                          variant="custom-checkbox"
                          htmlFor="inline-radio2"
                          style={{display:'grid',textAlign:'center'}}
                        >
                         <img src={goldBadge} width="40" />
                         <p>Gold</p>
                        </CLabel>
                      </CFormGroup>
                      </CCol>
                      <CCol xs='2'>
                      <CFormGroup variant="custom-radio" inline>
                        <CInputRadio
                          custom
                          id="inline-radio3"
                          name="badge"
                          onClick={() => {
                            setFieldValue("badge", "bronze");
                            setBadge('bronze')
                          }}
                          checked={values["badge"] === "bronze"}
                        />
                        <CLabel
                          variant="custom-checkbox"
                          htmlFor="inline-radio3"
                          style={{display:'grid',textAlign:'center'}}
                      >
                        <img src={bronzeBadge} width="40" />
                        <p>Bronze</p>
                        </CLabel>
                      </CFormGroup>
                      </CCol>
                      
                      </CRow>
                    </CCol>
                  </CFormGroup>
                </CCol>
                <CCol xs="12">
                  <TextFieldComponent
                    handleChange={handleChange}
                    name="phone"
                    touched={touched["phone"]}
                    error={errors["phone"]}
                    value={values["phone"]}
                    label={"Phone"}
                  />
                </CCol>
              </CRow>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" className="button-color">
                Submit
              </CButton>
              {noCard && (
                <CButton
                  onClick={handleBack}
                  color="secondary"
                  style={{
                    padding: "6px",
                    paddingRight: "10px",
                    paddingLeft: "10px",
                  }}
                  className="cancel-button-color"
                >
                  <CIcon
                    style={{ marginTop: "0px", marginRight: "6px" }}
                    content={cilArrowLeft}
                    width={16}
                  />
                  Back
                </CButton>
              )}
            </CCardFooter>
          </form>
        )}
      </Formik>
    </>
  );

  const cardWrapper = (children, hideCard = false) =>
    hideCard ? children : <CCard className="">{children}</CCard>;
  return (
    <>
      <CRow>
        <CCol xs="1"></CCol>
        <CCol xs="8">{cardWrapper(Form, noCard)}</CCol>
        <CCol xs="2"></CCol>
      </CRow>
    </>
  );
};

export default AddUsers;

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  CButton,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CFormGroup,
  CInput,
  CLabel,
  CInvalidFeedback,
  CSwitch,
  CInputRadio,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { Field, Formik } from "formik";
import * as yup from "yup";
import TextFieldComponent from "src/reusable/textfield";
import SelectInput from "src/reusable/select";
import CustomSwitch from "./switch";
import AsyncSelect from "src/reusable/asyncSelect";
function FileLongForm({
  data = {},
  col = 12,
  handleSubmit = () => {},
  handleClose,
  hideBasicInfo = false,
  customSchema = false,
  disableFields = false,
}) {
  const [receivingSwitch, setReceivingSwitch] = useState(true);
  const [initialState, setInitialState] = useState(data);

  let schema = yup.object().shape({
    fileNo: yup.string().required("File Number is a required field"),
    fileSecurityNo: yup.string().required("Security Code is a required field"),
    fileType: yup.string().required("Type is a required field"),
    assignedDate: yup.string().required(),
    recievedBy: yup.string().required(),
    recievedDate: yup.string().required(),
    assignedTo: yup.string().required(),
  });
  const [isAlfursan, setIsAlFursan] = useState(true);
  useEffect(() => {
    if (typeof data !== "undefined") {
      setInitialState(data);
    } else {
      setInitialState({});
    }
  }, [data]);

  const customChecked = (val) => {
    setIsAlFursan(val);
  };
  return (
    <div>
      <CCol xs="12" sm={12}>
        {Object.entries(initialState).length > 0 && (
          <Formik
            initialValues={initialState}
            validationSchema={customSchema ? customSchema : schema}
            onSubmit={(values) => {
              handleSubmit(values);
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
                {!hideBasicInfo && (
                  <>
                    {" "}
                    <CCardHeader>
                      <strong>Basic Information</strong>
                    </CCardHeader>
                    <CCardBody>
                      <TextFieldComponent
                        handleChange={handleChange}
                        name="fileNo"
                        touched={touched["fileNo"]}
                        error={errors["fileNo"]}
                        value={values["fileNo"]}
                        required={true}
                        disable={disableFields}
                        label={"File number"}
                      />
                      <TextFieldComponent
                        handleChange={handleChange}
                        name="fileSecurityNo"
                        touched={touched["fileSecurityNo"]}
                        error={errors["fileSecurityNo"]}
                        value={values["fileSecurityNo"]}
                        required={true}
                        disable={disableFields}
                        label={"Security code"}
                      />
                      <CFormGroup>
                        <CLabel htmlFor="ccmonth">
                          Type <span className="sterick-field">*</span>
                        </CLabel>
                        <SelectInput
                          handleBlur={setFieldTouched}
                          touched={touched["fileType"]}
                          disable={disableFields}
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
                      <CFormGroup>
                        <CLabel htmlFor="street">Project Name</CLabel>
                        <SelectInput
                          creatable={disableFields ? false : true}
                          options={[
                            { value: "Bahria", label: "Bahria" },
                            { value: "DHA", label: "DHA" },
                          ]}
                          defaultVal={values["projectName"]}
                          touched={touched["fileType"]}
                          disable={disableFields}
                          handleBlur={setFieldTouched}
                          value={values["projectName"]}
                          setValue={setFieldValue}
                          name="projectName"
                        />
                      </CFormGroup>
                    </CCardBody>
                  </>
                )}

                <CustomSwitch setState={customChecked} />
                <CCardHeader>
                  <strong>File Assignment</strong>
                </CCardHeader>
                <CCardBody>
                  <CFormGroup>
                    <CLabel htmlFor="assignedTo">
                      Assigned To <span className="sterick-field">*</span>
                    </CLabel>
                    {isAlfursan && (
                      <AsyncSelect
                        touched={touched["assignedTo"]}
                        handleBlur={setFieldTouched}
                        error={errors["assignedTo"]}
                        value={values["assignedTo"]}
                        setValue={setFieldValue}
                        name="assignedTo"
                        defaultVal={values["assignedTo"]}
                        url={"admin"}
                      />
                    )}
                    {!isAlfursan && (
                      <AsyncSelect
                        touched={touched["assignedTo"]}
                        handleBlur={setFieldTouched}
                        error={errors["assignedTo"]}
                        defaultVal={values["assignedTo"]}
                        value={values["assignedTo"]}
                        setValue={setFieldValue}
                        defaultVal={values["assignedTo"]}
                        name="assignedTo"
                        url={"dealer"}
                      />
                    )}
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
                      onChange={handleChange}
                      placeholder="ABC12345XTZ"
                    />
                    {touched["assignedDate"] && errors["assignedDate"] && (
                      <CInvalidFeedback>
                        {errors["assignedDate"]}
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
                          defaultVal={values["recievedBy"]}
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
                  <CButton type="submit" className="button-color">
                    Next <CIcon name="cil-arrow-right" width={16} />
                  </CButton>

                  {!hideBasicInfo && (
                    <CButton
                      color="secondary"
                      className="cancel-button-color"
                      onClick={handleClose}
                    >
                      Cancel
                    </CButton>
                  )}
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

import React from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CSwitch,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";
import AddFiles from "./add";
import { cilArrowRight, cilFile, cilMoney } from "@coreui/icons";
import AddInitialAssignment from "./initial-assignment";
import PricingComponent from "./pricing";

import { handleApi } from "src/reusable/api";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
const FilesComponent = () => {
  const history = useHistory();
  function removeCommas(str) {
    return str.replaceAll(",", "");
  }
  const [active, setActive] = React.useState(1);
  const [form, setForm] = React.useState({
    form1: {
      fileNo: "",
      fileSecurityNo: "",
      fileType: "",
      projectName: "",
      status: "Available",
    },
    form2: {
      assignedTo: "",
      assignment_date: new Date().toISOString().split("T")[0],
      received_by: "",
      received_date: new Date().toISOString().split("T")[0],
    },
    form3: {
      unitPrice: "",
      minimumRequiredDeposit: "",
      depositPercentage: "",
    },
  });
  const handleNextForm = (act) => {
    setActive(act);
  };
  const handleFormData = (data, num) => {
    let temp = form;
    temp[`form${num}`] = data;
    setForm(temp);
    if (num !== 3) {
      setActive(num + 1);
    } else {
      let lastForm = { ...form.form3 };
      lastForm["unitPrice"] = +removeCommas(lastForm["unitPrice"]);
      lastForm["depositPercentage"] = parseFloat(lastForm["depositPercentage"]);
      lastForm["minimumRequiredDeposit"] = +removeCommas(
        lastForm["minimumRequiredDeposit"]
      );

      let finalData = { ...form.form1, ...form.form2, ...lastForm };
      handleApi("post", "/plot-files", { ...finalData })
        .then((res) => {
          setTimeout(() => {
            toast.success("The file is added Successfully ! ", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            history.push("/files");
          }, 1000);
        })
        .catch((err) => {
          toast.error("An Error Occured! ", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    }
  };
  return (
    <>
      <CRow>
        <CCol>
          <CCard className="">
            <CCardHeader>
              <strong>Add new files</strong>
            </CCardHeader>

            <br />
            <CRow>
              <CCol xs="12" sm="12">
                <CRow>
                  <CCol xs={1}></CCol>
                  <CCol xs={3}>
                    <div
                      className={`multistep-icon ${
                        active == 1 ? "active-class2" : ""
                      }`}
                      onClick={() => {
                        setActive(1);
                      }}
                    >
                      <CIcon content={cilFile} height={30} />
                      <h6 className="align-center label-icon">
                        Basic Information
                      </h6>
                    </div>
                  </CCol>
                  <CCol xs={1}>
                    <CIcon
                      className="arrow-icon2"
                      content={cilArrowRight}
                      width={20}
                    />
                  </CCol>
                  <CCol xs={3}>
                    <CRow>
                      <div
                        className={`multistep-icon ${
                          active == 2 ? "active-class2" : ""
                        }`}
                        onClick={() => {
                          if (active !== 1) {
                            setActive(2);
                          }
                        }}
                      >
                        <CIcon name="cil-basket" height="30" />
                        {/* <CIcon content={cilFile} height={80} /> */}
                        <h6 className="align-center label-icon">
                          {" "}
                          Initial Assignment
                        </h6>
                      </div>
                    </CRow>
                  </CCol>
                  <CCol xs={1}>
                    <CIcon
                      className="arrow-icon2"
                      content={cilArrowRight}
                      width={20}
                    />
                  </CCol>
                  <CCol xs={3}>
                    <div
                      className={`multistep-icon ${
                        active == 3 ? "active-class2" : ""
                      }`}
                    >
                      <CIcon content={cilMoney} height={30} />
                      <h6 className="align-center label-icon">Pricing</h6>
                    </div>
                  </CCol>
                </CRow>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs="12" sm="3"></CCol>
              {active === 1 && (
                <AddFiles
                  nextForm={handleNextForm}
                  handleFormData={handleFormData}
                  data={form}
                />
              )}
              {active == 2 && (
                <AddInitialAssignment
                  nextForm={handleNextForm}
                  handleFormData={handleFormData}
                  data={form}
                />
              )}
              {active == 3 && (
                <PricingComponent
                  nextForm={handleNextForm}
                  handleFormData={handleFormData}
                  data={form}
                  hideExtraFields={true}
                />
              )}
            </CRow>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default FilesComponent;

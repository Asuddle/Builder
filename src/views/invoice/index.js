import React from "react";
import PropTypes from "prop-types";
import AlFursanBanner from "../files/alfursan-banner";
import logo from "../../assets/icons/alfursanlog.png";
import { Document, Page } from "react-pdf";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";
function InvoiceComponent(props) {
  return (
    //     <Document
    //     file="invoice.pdf"
    //     onLoadSuccess={onDocumentLoadSuccess}
    //   >
    <div>
      <CButton
        size="lg"
        color="secondary"
        onClick={() => {
          window.print();
        }}
      >
        Export/Print
      </CButton>
      <div class="invoice-box" id="print-data">
        <table cellpadding="0" cellspacing="0">
          <tr class="top">
            <td colspan="2">
              <table>
                <tr>
                  <td class="title">
                    <div>
                      <img
                        src={logo}
                        style={{ width: "100%", maxWidth: "120px" }}
                      />
                    </div>
                  </td>

                  <td>
                    Invoice #: {new Date().toISOString().split("T")[0]} - 123
                    <br />
                    Created: {new Date().toISOString().split("T")[0]}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr class="information">
            <td colspan="2">
              <table>
                <tr>
                  <td>
                    Office#01, 1st Floor, Plaza# 17,
                    <br /> Adjacent to hot & chilli,
                    <br /> Mini Commercial Market,
                    <br /> Phase 7 Bahria Town , Rawalpindi
                  </td>

                  <td>
                    Ch. Saqib
                    <br />
                    ch.saqib@gmail.com
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr class="heading">
            {/* <td> */}
            <h4>
              <strong>Summary</strong>
            </h4>
            <br />
            {/* </td> */}
            {/* <td>Price</td> */}
          </tr>

          <tr class="item">
            <td>
              No of files :<strong>4</strong>{" "}
            </td>
            <td>Rs 4 * 1,000,000</td>
          </tr>

          <tr class="item">
            <td>Total Payable: 4*7000</td>
            <td>Rs 28000</td>
          </tr>

          <tr class="item">
            <td>Total Discount</td>
            <td>30%</td>
          </tr>
          <tr class="item last">
            <td>Registration</td>

            <td>Rs 1000</td>
          </tr>

          <tr class="total">
            <td></td>

            <td>Total: Rs 4,030,000</td>
          </tr>
        </table>
      </div>
    </div>
  );
}

InvoiceComponent.propTypes = {};

export default InvoiceComponent;

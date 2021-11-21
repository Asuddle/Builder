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
                    Invoice #: 123
                    <br />
                    Created: {new Date().toISOString().split("T")[0]}
                    <br />
                    Due: {new Date().toISOString().split("T")[0]}
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
                    Sparksuite, Inc.
                    <br />
                    12345 Sunny Road
                    <br />
                    Alfursan Properties,Lahore 51310
                  </td>

                  <td>
                    Acme Corp.
                    <br />
                    John Doe
                    <br />
                    john@example.com
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr class="heading">
            <td>Payment Method</td>

            <td>Check #</td>
          </tr>

          <tr class="details">
            <td>Check</td>

            <td>1000</td>
          </tr>

          <tr class="heading">
            <td>Item</td>

            <td>Price</td>
          </tr>

          <tr class="item">
            <td>
              <strong>4</strong> Files Transfer{" "}
            </td>
            <td>Rs 4 * 1,000,000</td>
          </tr>

          <tr class="item">
            <td>Tax</td>
            <td>Rs 1000</td>
          </tr>

          <tr class="item">
            <td>Discount</td>
            <td>Rs 1000</td>
          </tr>
          <tr class="item last">
            <td>Registration</td>

            <td>Rs 1000</td>
          </tr>

          <tr class="total">
            <td></td>

            <td>Total: Rs 4,001,000</td>
          </tr>
        </table>
      </div>
    </div>
  );
}

InvoiceComponent.propTypes = {};

export default InvoiceComponent;

import React from 'react'
import PropTypes from 'prop-types'
import { CCard, CCol, CRow } from '@coreui/react'

import logo from "../../assets/icons/alfursanlog.png";
function AlFursanBanner(props) {
    return (
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
            <h2 style={{ paddingTop: "15px" }}>
              Al-Fursan Properties
            </h2>
            <p className="subtitle">
              The Ultimate Insider's Guide to City Real Estate
            </p>
          </CCol>
        </CRow>
      </CCard>
    )
}

AlFursanBanner.propTypes = {

}

export default AlFursanBanner


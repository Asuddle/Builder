import React, { useState } from "react";
import PropTypes from "prop-types";
import Files from "react-butterfiles";
import Dropzone from "react-dropzone-uploader";

import { CButton, CCard, CCardBody, CCardHeader, CHeader } from "@coreui/react";
function BulkFileTransfer(props) {
  const [files, setFiles] = useState([]);
  console.log("files  ===?dd:::", files);

  const getUploadParams = () => {
    return { url: "https://httpbin.org/post" };
  };

  const handleChangeStatus = ({ meta }, status) => {
    console.log(status, meta);
  };

  const handleSubmit = (files, allFiles) => {
    allFiles.forEach((f) => f.remove());
  };

  return (
    <div>
      <CCard>
        <CCardHeader>
          <strong>Bulk Files Upload</strong>
        </CCardHeader>{" "}
        <CCardBody>
          <Dropzone
            getUploadParams={getUploadParams}
            onChangeStatus={handleChangeStatus}
            onSubmit={handleSubmit}
            styles={{ dropzone: { minHeight: 400 } }}
          />
        </CCardBody>
      </CCard>
    </div>
  );
}

BulkFileTransfer.propTypes = {};

export default BulkFileTransfer;

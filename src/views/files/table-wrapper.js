import React, { useState } from "react";
import PropTypes from "prop-types";
import FilesTable from "./table";
import EditModal from "./edit-modal";
import DeleteFileModal from "./delete-modal";
import { handleApi } from "src/reusable/api";
function TableWrapper(props) {
  const [isEdit, setIsEdit] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [data, setData] = useState({});
  const [refresh, setRefresh] = useState(false);
  const handleEdit = (data) => {
    if (isEdit === true) {
      setData({});
    } else {
      setData(data);
    }
    setIsEdit(!isEdit);
  };
  const handleDelete = () => {
    handleApi("delete", `/plot-files/${data.id}`).then((res) => {
      setDeleteModal(!deleteModal);
      setRefresh(!refresh);
    });
  };
  const getData = (row) => {
    setData(row);
    setDeleteModal(!deleteModal);
  };
  return (
    <div>
      <FilesTable isEdit={handleEdit} isDelete={getData} refresh={refresh} />
      <EditModal open={isEdit} handleClose={handleEdit} data={data} />
      <DeleteFileModal
        open={deleteModal}
        handleClose={() => setDeleteModal(!deleteModal)}
        handleDelete={handleDelete}
      />
    </div>
  );
}

TableWrapper.propTypes = {};

export default TableWrapper;
